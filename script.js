
var main=function() {
  var CANVAS=document.getElementById("your_canvas");
  CANVAS.width=1300;
  CANVAS.height=680;

  /*========================= CAPTURE MOUSE EVENTS ========================= */

  console.log(CANVAS.width);
  console.log(CANVAS.height);


  var AMORTIZATION=0.95;
  var drag=false;

  var mouse_x,mouse_y;
  var old_x, old_y;

  var dX=0, dY=0;
  var mouseDown=function(e) {
    drag=true;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
    return false;
  };

  var mouseUp=function(e){
    drag=false;
  };

  var mouseMove=function(e) {
    var x = e.pageX;
    var y = e.pageY;
    y=y*(-1);
    x=x-650;
    y=y+340;
    mouse_x=x;
    mouse_y=y;
    // console.log(x); console.log(y);

    if (!drag) return false;
    dX=(e.pageX-old_x)*2*Math.PI/CANVAS.width,
      dY=(e.pageY-old_y)*2*Math.PI/CANVAS.height;
    THETA+=dX;
    PHI+=dY;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
  };

  var onkeypress = function(e){
    if(e.keyCode==13)
    {
      if (mode==1) {
        mode=2;
      }
      else if(mode==2)
      {
        final_mouse_x = mouse_x;
        final_mouse_y = mouse_y;
        mode = 3;
      }
      else if(mode==3)
      {
        var ini = globals.ini_velocity;
        var angle = Math.atan((final_mouse_y-striker.y)/(final_mouse_x-striker.x));
        striker.vx = ini*Math.cos(angle);
        striker.vy = ini*Math.sin(angle);
        mode=4;
      }
    }
    if(mode==3 && e.keyCode==112)
    {
      if(power<150)
      {
        power++;
        power_vao = pow.increase_power(power_vao,globals);
      }
    }
    if(mode==3 && e.keyCode==111)
    {
      if(power>1)
      {
        power--;
        power_vao = pow.decrease_power(power_vao,globals);
      }
    }

  }

  CANVAS.addEventListener("mousedown", mouseDown, false);
  CANVAS.addEventListener("mouseup", mouseUp, false);
  CANVAS.addEventListener("mouseout", mouseUp, false);
  CANVAS.addEventListener("mousemove", mouseMove, false);
  window.addEventListener("keypress",onkeypress,true);
  /*========================= GET WEBGL CONTEXT ========================= */
  var GL;
  try {
    GL = CANVAS.getContext("experimental-webgl", {antialias: true});
  } catch (e) {
    alert("You are not webgl compatible :(") ;
    return false;
  }


  /*========================= SHADERS ========================= */
  /*jshint multistr: true */

  var shader_vertex_source="\n\
attribute vec3 position;\n\
uniform mat4 Pmatrix;\n\
uniform mat4 Vmatrix;\n\
uniform mat4 Mmatrix;\n\
attribute vec3 color; //the color of the point\n\
varying vec3 vColor;\n\
void main(void) { //pre-built function\n\
gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
vColor=color;\n\
}";

  var shader_fragment_source="\n\
precision mediump float;\n\
varying vec3 vColor;\n\
void main(void) {\n\
gl_FragColor = vec4(vColor, 1.);\n\
}";

  var get_shader=function(source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert("ERROR IN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };
  var shader_vertex=get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
  var shader_fragment=get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

  var SHADER_PROGRAM=GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);

  GL.linkProgram(SHADER_PROGRAM);

  var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
  var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
  var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");

  var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
  var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

  GL.enableVertexAttribArray(_color);
  GL.enableVertexAttribArray(_position);

  var globals ={
    GL:GL,
    CANVAS:CANVAS,
    _Pmatrix:_Pmatrix,
    _Vmatrix:_Vmatrix,
    _Mmatrix:_Mmatrix,
    _color:_color,
    _position:_position,
    mfactor:7,
    sfactor:3,
    cfactor:2.5,
    ini_velocity:60
  };

  GL.useProgram(SHADER_PROGRAM);



  var THETA=0,
      PHI=0;


  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(1.0, 1.0, 1.0, 0.0);
  GL.clearDepth(1.0);

  board_vaos = board.get_board(globals);
  designs_vaos = board.get_designs(globals);
  var player = 1;
  var mode = 1 ;
  var power = 75;
  var striker = coins.get_vao_striker(0,designs_vaos.circles[0].y-4,-11,1,1,1,globals);
  var coins_vao = coins.set_coins(globals);
  var power_vao = pow.set_power(power,globals);
  var final_mouse_x;
  var final_mouse_y;

  var time_old=0;
  var animate=function(time) {
    var dt=time-time_old;
    // console.log(dt);
    if (!drag) {
      dX*=AMORTIZATION, dY*=AMORTIZATION;
      THETA+=dX, PHI+=dY;
    }

    time_old=time;

    GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    board.draw_board(board_vaos,THETA,PHI,globals);
    board.draw_designs(designs_vaos,THETA,PHI,globals);
    if(mode==2)
      console.log(mode);

    if(mode==1)
    {
      striker.x = mouse_x;
      if(striker.x>designs_vaos.circles[0].x) striker.x=designs_vaos.circles[0].x;
      if(striker.x<designs_vaos.circles[1].x) striker.x=designs_vaos.circles[1].x;
      striker = coins.update_striker(striker,globals);
      construct.draw_vao(striker.vao.vao,THETA,PHI,1,globals);
      var i;
      for(i=0;i<coins_vao.length;i++)
      {
        construct.draw_vao(coins_vao[i].vao,THETA,PHI,1,globals);
      }
      for(i=0;i<power_vao.length;i++)
      {
        construct.draw_vao(power_vao[i].vao,THETA,PHI,1,globals);
      }
    }
    if(mode==2)
    {
      line_vao = twod.get_vao_line(striker.x,striker.y,striker.z,mouse_x,-1*mouse_y,striker.z,1,0,0,globals);
      construct.draw_vao(line_vao.vao,THETA,PHI,1,globals);
      construct.draw_vao(striker.vao.vao,THETA,PHI,1,globals);
      for(i=0;i<coins_vao.length;i++)
      {
        construct.draw_vao(coins_vao[i].vao,THETA,PHI,1,globals);
      }
      for(i=0;i<power_vao.length;i++)
      {
        construct.draw_vao(power_vao[i].vao,THETA,PHI,1,globals);
      }
    }
    if(mode==3)
    {
      line_vao = twod.get_vao_line(striker.x,striker.y,striker.z,final_mouse_x,-1*final_mouse_y,striker.z,1,0,0,globals);
      construct.draw_vao(striker.vao.vao,THETA,PHI,1,globals);
      for(i=0;i<coins_vao.length;i++)
      {
        construct.draw_vao(coins_vao[i].vao,THETA,PHI,1,globals);
      }
      for(i=0;i<power_vao.length;i++)
      {
        construct.draw_vao(power_vao[i].vao,THETA,PHI,1,globals);
      }
    }
    if(mode==4)
    {

      // striker.x +=dt*striker.vx;
      // striker.y +=dt*striker.vy;
      striker.x+=0.5;
      striker.y+=0.5
      striker = coins.update_striker(striker,globals);
      construct.draw_vao(striker.vao.vao,THETA,PHI,1,globals);
      for(i=0;i<coins_vao.length;i++)
      {
        construct.draw_vao(coins_vao[i].vao,THETA,PHI,1,globals);
      }
      for(i=0;i<power_vao.length;i++)
      {
        construct.draw_vao(power_vao[i].vao,THETA,PHI,1,globals);
      }


    }

    GL.flush();

    window.requestAnimationFrame(animate);
  };
  animate(0);
};
