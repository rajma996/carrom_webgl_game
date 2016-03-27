
var cylinder={
  get_vao_cylinder: function(x,y,z,r,h,c1,c2,c3,globals){
    var vertices = []
    vertices.push(x,y,z+h,c1,c2,c3);
    vertices.push(x,y,z-h,c1,c2,c3);
    var i,j;
    for (i=0;i<=360;i++)
    {
      vertices.push(x+r*Math.cos(i*Math.PI/190),y+r*Math.sin(i*Math.PI/190),z+h,c1-0.5,c2-0.5,c3);
      vertices.push(x+r*Math.cos(i*Math.PI/190),y+r*Math.sin(i*Math.PI/190),z-h,c1,c2,c3);
    }
    var faces = [];
    var l = vertices.length/6;
    for(i=2,j=0;j<(l/2-2);i+=2,j++)
    {
      faces.push(0,i,i+2);
    }
    faces.push(0,(l/2-1)*2,2);
    for(i=3,j=0;j<(l/2-2);i+=2,j++)
    {
      faces.push(1,i,i+2);
    }
    faces.push(1,(l/2-1)*2+1,3);
    for(i=2,j=0;j<(l/2-2);i+=2,j++)
    {
      faces.push(i,i+1,i+2);
      faces.push(i+1,i+2,i+3);
    }
    faces.push((l/2-1)*2,(l/2-1)*2+1,2);
    faces.push((l/2-1)*2+1,2,3);
    var vao_temp = construct.get_vao(vertices,faces,globals);
    var cylinder_final = {
      vao:vao_temp,
      x:x,r:r,
      y:y,h:h,
      z:z
    };
    return cylinder_final;

  }


  // get_vao_hollow_cylinder: function(x,y,z,r,c1,c2,c3,globals){
  //   var vertices = []
  //   vertices.push(x,y,z+1,c1,c2,c3);
  //   vertices.push(x,y,z-1,c1,c2,c3);
  //   var i,j;
  //   for (i=0;i<=360;i++)
  //   {
  //     vertices.push(x+r*Math.cos(i*Math.PI/190),y+r*Math.sin(i*Math.PI/190),z+1,c1-0.5,c2-0.5,c3);
  //     vertices.push(x+r*Math.cos(i*Math.PI/190),y+r*Math.sin(i*Math.PI/190),z-1,c1,c2,c3);
  //   }
  //   var faces = [];
  //   var l = vertices.length/6;
  //   // for(i=2,j=0;j<(l/2-2);i+=2,j++)
  //   // {
  //   //   faces.push(0,i,i+2);
  //   // }
  //   // faces.push(0,(l/2-1)*2,2);
  //   // for(i=3,j=0;j<(l/2-2);i+=2,j++)
  //   // {
  //   //   faces.push(1,i,i+2);
  //   // }
  //   // faces.push(1,(l/2-1)*2+1,3);
  //   for(i=2,j=0;j<(l/2-2);i+=2,j++)
  //   {
  //     faces.push(i,i+1,i+2);
  //     faces.push(i+1,i+2,i+3);
  //   }
  //   faces.push((l/2-1)*2,(l/2-1)*2+1,2);
  //   faces.push((l/2-1)*2+1,2,3);
  //   var vao_temp = construct.get_vao(vertices,faces,globals);
  //   var cylinder_final = {
  //     vao:vao_temp,
  //     x:x,r:r,
  //     y:y,
  //     z:z
  //   };
  //   return cylinder_final;
  //
  // }


};
