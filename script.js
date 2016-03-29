
var main=function() {
  var CANVAS=document.getElementById("your_canvas");
  var textCanvas = document.getElementById("text");
  var ctx = textCanvas.getContext("2d");

  CANVAS.width=1300;
  CANVAS.height=680;

  /*========================= CAPTURE MOUSE EVENTS ========================= */



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
    // alert(e.keyCode);
    if(e.keyCode==49)
    {
      globals.camera_mode = 1;
    }
    if(e.keyCode==50)
    {
      globals.camera_mode = 2;
    }
    if(e.keyCode==51)
    {
      globals.camera_mode = 3;
    }
    if(e.keyCode==110)
    {
       striker = coins.get_vao_striker(0,designs_vaos.circles[0].y-4,-11,1,1,1,globals); mode=1; return;
     }
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
        var ini = globals.ini_velocity*power;
        var angle = Math.atan((final_mouse_y-(-1*striker.y))/(final_mouse_x-striker.x));
        if(angle<0) angle+=3.14159;
        // console.log(final_mouse_x); console.log(final_mouse_y);
        // console.log(striker.x); console.log(-1*striker.y);
        // console.log(angle*180/Math.PI);
        striker.vx = ini*Math.cos(angle);
        striker.vy = -1*ini*Math.sin(angle);
        // console.log(striker.vx,striker.vy);
       mode=4;
      }
    }
    if(mode==3 && e.keyCode==38)
    {
      if(power<150)
      {
        power++;
        power_vao = pow.increase_power(power_vao,globals);
      }
    }
    if(mode==3 && e.keyCode==40)
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
  window.addEventListener("keypress",onkeypress,false);
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
    ini_velocity:3.5,
    camera_mode:1,
    striker:striker,
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
  // console.log(coins_vao[0].x);
  var power_vao = pow.set_power(power,globals);
  var final_mouse_x;
  var final_mouse_y;
  var starttime = (new Date()).getTime();
  var score_start = (new Date()).getTime();
  var score =100;
  var red_in = 0;

  var time_old=0;
  var update_score = function(ctx)
  {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "48px serif";
    ctx.fillText('Score:' + score, 80, 80);
  }
  update_score(ctx);
  var animate=function(time) {
    globals.striker = striker
    // console.log(globals.camera_mode);
    // while((new Date()).getTime()-starttime<50);
    // console.log(THETA,PHI);
    var dt=((new Date()).getTime()-starttime)/1000;
    starttime = (new Date()).getTime();

    if((new Date()).getTime() - score_start >=5000)
    {
      score -=1;
      score_start = (new Date()).getTime();
      update_score(ctx);
    }
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
        construct.draw_vao(coins_vao[i].vao.vao,THETA,PHI,1,globals);
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
        construct.draw_vao(coins_vao[i].vao.vao,THETA,PHI,1,globals);
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
        construct.draw_vao(coins_vao[i].vao.vao,THETA,PHI,1,globals);
      }
      for(i=0;i<power_vao.length;i++)
      {
        construct.draw_vao(power_vao[i].vao,THETA,PHI,1,globals);
      }
    }
    if(mode==4)
    {
      striker.x +=dt*striker.vx;
      striker.y +=dt*striker.vy;
      if(striker.vx>0) striker.vx-=1;
      if(striker.vx<0) striker.vx+=1;
      if(striker.vy>0) striker.vy-=1;
      if(striker.vy<0) striker.vy+=1;
      if(striker.vx<=1 && striker.vx>=-1) striker.vx=0;
      if(striker.vy<=1 && striker.vy>=-1) striker.vy=0;
      var i;
      for(i=0;i<coins_vao.length;i++)
      {
        // if(coins_vao[i].vx>500 || coins_vao[i].vy>500) console.log(coins_vao[i]);
        coins_vao[i].x +=dt*coins_vao[i].vx;
        coins_vao[i].y +=dt*coins_vao[i].vy;
        if(coins_vao[i].vx>0) coins_vao[i].vx-=1;
        if(coins_vao[i].vx<0) coins_vao[i].vx+=1;
        if(coins_vao[i].vy<0) coins_vao[i].vy+=1;
        if(coins_vao[i].vy>0) coins_vao[i].vy-=1;
        if(coins_vao[i].vx<=1 && coins_vao[i].vx>=-1) coins_vao[i].vx=0;
        if(coins_vao[i].vy<=1 && coins_vao[i].vy>=-1) coins_vao[i].vy=0;
      }
      striker = coins.update_striker(striker,globals);
      for(i=0;i<coins_vao.length;i++)
      {
        coins_vao[i] = coins.update_coin(coins_vao[i],globals);
      }
      for(i=0;i<coins_vao.length;i++)
      {
        if(collision.dis(striker.x,striker.y,coins_vao[i].x,coins_vao[i].y)<striker.r+coins_vao[i].r+5)
        {
          vnet = collision.check_collision(striker.x,striker.y,coins_vao[i].x,coins_vao[i].y,striker.vx,striker.vy,coins_vao[i].vx,coins_vao[i].vy,globals);
          striker.vx = vnet[0];
          striker.vy = vnet[1];
          coins_vao[i].vx = vnet[2];
          coins_vao[i].vy = vnet[3];
        }
      }
      var i,j;
      for(i=0;i<coins_vao.length;i++)
      {
        for(j=i+1;j<coins_vao.length;j++)
        {
          if(collision.dis(coins_vao[i].x,coins_vao[i].y,coins_vao[j].x,coins_vao[j].y)<coins_vao[i].r+coins_vao[j].r+5)
          {
            vnet = collision.check_collision(coins_vao[i].x,coins_vao[i].y,coins_vao[j].x,coins_vao[j].y,coins_vao[i].vx,coins_vao[i].vy,coins_vao[j].vx,coins_vao[j].vy,globals);
            coins_vao[i].vx = vnet[0];
            coins_vao[i].vy = vnet[1];
            coins_vao[j].vx = vnet[2];
            coins_vao[j].vy = vnet[3];
          }
        }
      }
      i = collision.check_boundary(striker,globals);
      if(i!=0)
      {
        if(i==1 || i==3) striker.vx*=-1;
        else if(i==2 || i==4) striker.vy*=-1;
      }
      for(j=0;j<coins_vao.length;j++)
      {
        i = collision.check_boundary(coins_vao[j],globals);
        if(i==1 || i==3) coins_vao[j].vx*=-1;
        else if(i==2 || i==4) coins_vao[j].vy*=-1;
      }

      if(collision.check_pocket(striker,globals)==1)
      {
        striker = coins.get_vao_striker(0,designs_vaos.circles[0].y-4,-11,1,1,1,globals);
        mode=1;
        score-=20;
        update_score(ctx);
      }
      var in_flag = 0;
      for(j=0;j<coins_vao.length;j++)
      {
        if(collision.check_pocket(coins_vao[j],globals)==1)
        {
          if(coins_vao[j].c1==1 && coins_vao[j].c2==1) // color is same as striker
          {
            in_flag = 1;
            if(red_in==0)
            {
              score +=5;
              update_score(ctx);
            }
            else if(red_in==1)
            {
              score +=20;
              update_score(ctx);
              red_in = 0;
            }
          }
          else if(coins_vao[j].c1==0)  { score -=20; update_score(ctx); }
          else if (coins_vao[j].c1==1 && coins_vao[j].c2==0) red_in = 1;
          coins_vao.splice(j,1);
        }
      }
      if(red_in==1 && in_flag==0)
      {
        var scale = globals.mfactor;
        var cscale = globals.cfactor;
        var temp_vao = twod.get_vao_circle(0,0,-11,cscale*scale,1,0,0,globals);
        temp = {
          vao:temp_vao,
          x:0,y:0,z:-11,c1:1,c2:0,c3:0,vx:0,vy:0,r:cscale*scale
        };
        coins_vao.push(temp);
      }

      construct.draw_vao(striker.vao.vao,THETA,PHI,1,globals);
      for(i=0;i<coins_vao.length;i++)
      {
        construct.draw_vao(coins_vao[i].vao.vao,THETA,PHI,1,globals);
      }
      for(i=0;i<power_vao.length;i++)
      {
        construct.draw_vao(power_vao[i].vao,THETA,PHI,1,globals);
      }
      var mode_flag = 0;
      // console.log(striker.vx,striker.vy);
      if(striker.vx!=0 || striker.vy!=0) { mode_flag =1; }
      for(i=0;i<coins_vao.length;i++) if(coins_vao[i].vx!=0 || coins_vao[i].vy!=0) {  mode_flag=1; }
      // console.log(mode_flag);
      if(mode_flag==0){  mode=1;   striker = coins.get_vao_striker(0,designs_vaos.circles[0].y-4,-11,1,1,1,globals); }

    }

    GL.flush();

    window.requestAnimationFrame(animate);
  };
  animate(0);
};
