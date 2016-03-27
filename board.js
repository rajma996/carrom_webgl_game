
var board={
  get_board: function(globals){
      var side = []
      var scale = globals.mfactor;
      var temp = cuboid.get_vao_cube(0,75*scale/2,0,75*scale/2+15,15,15,205/255,133/255,63/255,globals);
      side.push(temp);
      temp = cuboid.get_vao_cube(75*scale/2,0,0,15,75*scale/2,15,205/255,133/255,63/255,globals);
      side.push(temp);
      temp = cuboid.get_vao_cube(0,-75*scale/2,0,75*scale/2+15,15,15,205/255,133/255,63/255,globals);
      side.push(temp);
      temp = cuboid.get_vao_cube(-75*scale/2,0,0,15,75*scale/2,15,205/255,133/255,63/255,globals);
      side.push(temp);

      var center = cuboid.get_vao_cube(0,0,0,75*scale/2-5,75*scale/2-5,10,1,205/255,148/255,globals);

      var holes = []
      temp = cylinder.get_vao_cylinder(75*scale/2-50,75*scale/2-50,0,5*scale,15,50/255,50/255,50/255,globals);
      holes.push(temp);
      temp = cylinder.get_vao_cylinder(-1*75*scale/2+50,75*scale/2-50,0,5*scale,15,50/255,50/255,50/255,globals);
      holes.push(temp);
      temp = cylinder.get_vao_cylinder(75*scale/2-50,-1*75*scale/2+50,0,5*scale,15,50/255,50/255,50/255,globals);
      holes.push(temp);
      temp = cylinder.get_vao_cylinder(-1*75*scale/2+50,-1*75*scale/2+50,0,5*scale,15,50/255,50/255,50/255,globals);
      holes.push(temp);

      var board_vaos ={
        side:side,
        center:center,
        holes:holes
      };
      return board_vaos;
  },

  draw_board: function(board_vaos,THETA,PHI,globals){
    var i;
    for (i=0;i<board_vaos.holes.length;i++){
      construct.draw_vao(board_vaos.holes[i].vao,THETA,PHI,1,globals);
    }

    for(i=0;i<board_vaos.side.length;i++){
      construct.draw_vao(board_vaos.side[i].vao,THETA,PHI,1,globals);
    }

    construct.draw_vao(board_vaos.center.vao,THETA,PHI,1,globals);
  },

  get_designs: function(globals){
    var circles = [];
    var scale = globals.mfactor;

    var temp = twod.get_vao_circle(75*scale/2-125,75*scale/2-125,-15,3.5*scale,255/255,51/255,51/255,globals);
    circles.push(temp);
    temp = twod.get_vao_circle(-75*scale/2+125,75*scale/2-125,-15,3.5*scale,255/255,51/255,51/255,globals);
    circles.push(temp);
    temp = twod.get_vao_circle(75*scale/2-125,-75*scale/2+125,-15,3.5*scale,255/255,51/255,51/255,globals);
    circles.push(temp);
    temp = twod.get_vao_circle(-75*scale/2+125,-75*scale/2+125,-15,3.5*scale,255/255,51/255,51/255,globals);
    circles.push(temp);

    var lines = [];
    temp = cuboid.get_vao_cube(0,75*scale/2-100,-20,75*scale/2-125,1,1,255/255,51/255,51/255,globals);
    lines.push(temp);
    temp = cuboid.get_vao_cube(75*scale/2-100,0,-20,1,75*scale/2-125,1,255/255,51/255,51/255,globals);
    lines.push(temp);
    temp = cuboid.get_vao_cube(0,-75*scale/2+100,-20,75*scale/2-125,1,1,255/255,51/255,51/255,globals);
    lines.push(temp);
    temp = cuboid.get_vao_cube(-75*scale/2+100,0,-20,1,75*scale/2-125,1,255/255,51/255,51/255,globals);
    lines.push(temp);



    var design_final = {
      circles:circles,
      lines:lines
    }
    return design_final;
  },

  draw_designs: function (designs_vaos,THETA,PHI,globals) {
    var i;
    for (i=0;i<designs_vaos.circles.length;i++){
      construct.draw_vao(designs_vaos.circles[i].vao,THETA,PHI,1,globals);
    }
    for (i=0;i<designs_vaos.lines.length;i++){
      construct.draw_vao(designs_vaos.lines[i].vao,THETA,PHI,1,globals);
    }

  }


};
