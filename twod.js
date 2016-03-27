
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

  }


};
