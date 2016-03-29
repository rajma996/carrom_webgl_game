
var construct={
  get_vao: function(vertex_array,faces_array,globals){

    var GL=globals.GL;
    var VAO_VERTEX= GL.createBuffer ();
    GL.bindBuffer(GL.ARRAY_BUFFER, VAO_VERTEX);
    GL.bufferData(GL.ARRAY_BUFFER,
                  new Float32Array(vertex_array),
      GL.STATIC_DRAW);

    var VAO_FACES= GL.createBuffer ();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, VAO_FACES);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
                  new Uint16Array(faces_array),
      GL.STATIC_DRAW);

      var temp = {
        vertex_array: vertex_array,
        faces_array: faces_array,
        vertex_bind: VAO_VERTEX,
        faces_bind: VAO_FACES
      };
      return (temp);
  },

  draw_vao: function(vao,THETA,PHI,mode,globals){

    var GL= globals.GL;
    var CANVAS=globals.CANVAS;
    var _Pmatrix = globals._Pmatrix;
    var _Vmatrix = globals._Vmatrix;
    var _Mmatrix = globals._Mmatrix;
    var _position = globals._position;
    var _color = globals._color;


    if (globals.camera_mode==1)
    {
      var PROJMATRIX = LIBS.get_ortho(-650,650,-340,340,-1200,1200);
      var MOVEMATRIX=LIBS.get_I4();
      var VIEWMATRIX=LIBS.get_I4();
      LIBS.translateZ(VIEWMATRIX, -6);
      LIBS.set_I4(MOVEMATRIX);
      LIBS.rotateY(MOVEMATRIX, THETA);
      LIBS.rotateX(MOVEMATRIX, PHI);
    }
    if(globals.camera_mode==2)
    {
      var PROJMATRIX = LIBS.get_ortho(-500,500,-300,300,-1200,1200);
      var MOVEMATRIX=LIBS.get_I4();
      var VIEWMATRIX=LIBS.get_I4();
      LIBS.translateZ(VIEWMATRIX, -6);
      LIBS.set_I4(MOVEMATRIX);
      LIBS.rotateY(MOVEMATRIX, -0.01470482);
      LIBS.rotateX(MOVEMATRIX, -1.2658770398);
    }
    if(globals.camera_mode==3)
    {
      // console.log(globals.striker);
      var sx = globals.striker.x;
      var sy = globals.striker.y;
      var tx,ty;
      if (globals.striker.vx>=0) tx=10;
      else if(globals.striker<0) tx=-10;
      if(globals.striker.vy>0) ty=10;
      else if(globals.striker.vy<=0) ty=-10;
      var VIEWMATRIX=LIBS.makeLookAt([sx,sy,20],[sx+tx,sy+ty,0],[0,-1,0]);
      var PROJMATRIX = LIBS.get_ortho(-300,300,-100,100,-1200,1200);
      var MOVEMATRIX=LIBS.get_I4();
      LIBS.translateZ(VIEWMATRIX, -6);
      LIBS.set_I4(MOVEMATRIX);
      LIBS.rotateY(MOVEMATRIX, THETA);
      LIBS.rotateX(MOVEMATRIX, PHI);

    }


    GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
    GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
    GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);

    GL.bindBuffer(GL.ARRAY_BUFFER, vao.vertex_bind);
    GL.vertexAttribPointer(_position, 3 , GL.FLOAT, false,4*(3+3),0) ;
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false,4*(3+3),3*4) ;

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vao.faces_bind);
    if(mode==1)
      GL.drawElements(GL.TRIANGLES, vao.faces_array.length, GL.UNSIGNED_SHORT, 0);
    if (mode==2)
    GL.drawElements(GL.LINES, vao.faces_array.length, GL.UNSIGNED_SHORT, 0);


  }



};
