
var main=function() {
  var CANVAS=document.getElementById("your_canvas");
  CANVAS.width=window.innerWidth;
  CANVAS.height=window.innerHeight;

  /*========================= CAPTURE MOUSE EVENTS ========================= */

  var AMORTIZATION=0.95;
  var drag=false;


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
    if (!drag) return false;
    dX=(e.pageX-old_x)*2*Math.PI/CANVAS.width,
      dY=(e.pageY-old_y)*2*Math.PI/CANVAS.height;
    THETA+=dX;
    PHI+=dY;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
  };

  CANVAS.addEventListener("mousedown", mouseDown, false);
  CANVAS.addEventListener("mouseup", mouseUp, false);
  CANVAS.addEventListener("mouseout", mouseUp, false);
  CANVAS.addEventListener("mousemove", mouseMove, false);

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
    _position:_position
  };

  GL.useProgram(SHADER_PROGRAM);

  /*========================= THE CUBE ========================= */
  //POINTS :
  var cube_vertex=[
    -1,-1,-1,     1,1,0,
    1,-1,-1,     1,1,0,
    1, 1,-1,     1,1,0,
    -1, 1,-1,     1,1,0,

    -1,-1, 1,     0,0,1,
    1,-1, 1,     0,0,1,
    1, 1, 1,     0,0,1,
    -1, 1, 1,     0,0,1,



    // -1,-1,-1,     0,1,1,
    // -1, 1,-1,     0,0.5,1,
    // -1, 1, 1,     0,1,1,
    // -1,-1, 1,     0,1,0.5,
    //
    // 1,-1,-1,     1,0,0,
    // 1, 1,-1,     1,0,1,
    // 1, 1, 1,     1,1,0,
    // 1,-1, 1,     1,0,0,
    //
    // -1,-1,-1,     1,0,1,
    // -1,-1, 1,     1,0,1,
    // 1,-1, 1,     1,0,1,
    // 1,-1,-1,     1,0,1,
    //
    // -1, 1,-1,     0,1,0,
    // -1, 1, 1,     1,1,0,
    // 1, 1, 1,     0,1,1,
    // 1, 1,-1,     0.5,1,0

  ];



  // FACES :
  var cube_faces = [
    // 0,1,2,
    // 0,2,3,

    4,5,6,
    4,6,7,

    4,5,6,
    4,6,7,

    4,5,6,
    4,6,7,
    4,5,6,
    4,6,7,
    4,5,6,
    4,6,7,
    4,5,6,
    4,6,7

   //
  //  1,2,6,
  //  1,6,5,
  //  0,4,7,
      // 0,7,3,
  //  1,4,0,
      // 1,4,5,
      // 2,3,7,
      // 2,7,6

  ];

  cube_vao = construct.get_vao(cube_vertex,cube_faces,globals);

  /*========================= MATRIX ========================= */


  var THETA=0,
      PHI=0;

  /*========================= DRAWING ========================= */
  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(0.0, 0.0, 0.0, 0.0);
  GL.clearDepth(1.0);

  var time_old=0;
  var animate=function(time) {
    var dt=time-time_old;
    if (!drag) {
      dX*=AMORTIZATION, dY*=AMORTIZATION;
      THETA+=dX, PHI+=dY;
    }

    time_old=time;

    GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    construct.draw_vao(cube_vao,THETA,PHI,globals);
    GL.flush();

    window.requestAnimationFrame(animate);
  };
  animate(0);
};
