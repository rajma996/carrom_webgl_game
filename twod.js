
var twod={
  get_vao_circle: function(x,y,z,r,c1,c2,c3,globals){
    var vertices = []
    vertices.push(x,y,z,c1,c2,c3);
    var i,j;
    for (i=0;i<=360;i++)
    {
      vertices.push(x+r*Math.cos(i*Math.PI/190),y+r*Math.sin(i*Math.PI/190),z,c1,c2,c3);
    }
    var faces = [];
    var l = vertices.length/6;
    for(i=1,j=0;j<(l-2);i++,j++)
    {
      faces.push(0,(i)%l,(i+1)%l);
    }
    faces.push(0,l-1,1);

    var temp_vao = construct.get_vao(vertices,faces,globals);
    var twod_circle = {
      vao:temp_vao,
      x:x,r,
      y:y,
      z:z
    };
    return twod_circle;

  },

  get_vao_line: function(x1,y1,z1,x2,y2,z2,c1,c2,c3,globals){
    var vertices =[
      x1+10,y1,z1, c1,c2,c3,
      x1,y1+10,z1, c1,c2,c3,
      x1-10,y1,z1, c1,c2,c3,
      x1,y1-10,z1, c1,c2,c3,

      x2+10,y2,z2, c1,c2,c3,
      x2,y2+10,z2, c1,c2,c3,
      x2-10,y2,z2, c1,c2,c3,
      x2,y2-10,z2, c1,c2,c3

    ]
    var faces = [
      0,1,2,0,2,3,
      1,2,10,2,10,6,
      0,1,10,0,4,10,
      0,4,3,3,4,7,
      2,3,6,3,6,7,
      6,7,4,6,4,10

    ]
    temp_vao = construct.get_vao(vertices,faces,globals);
    var line_final = {
      vao:temp_vao,
      x1:x1,y1:y1,z1:z1,
      x2:x2,y2:y2,z2:z2
    };
    return line_final;

  }

};
