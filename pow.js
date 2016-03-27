
var pow={
  set_power: function(power,globals){
    var power_vao = [];
    var i;
    var scale = globals.mfactor;
    for (i=1;i<=power;i++)
    {
      var temp = cuboid.get_vao_cube(50*scale,(75-i)*scale/2,0,15,scale/2,15,1,0,0,globals);
      power_vao.push(temp);
    }
    return power_vao;
  },

  increase_power: function(power_vao,globals){
    var scale = globals.mfactor;
    var pre_power = power_vao.length;
    pre_power++;
    var temp = cuboid.get_vao_cube(50*scale,(75-pre_power)*scale/2,0,15,scale/2,15,1,0,0,globals);
    power_vao.push(temp);
    return power_vao;
  },

  decrease_power: function(power_vao,globals){
    power_vao.pop();
    return power_vao;
  }

};
