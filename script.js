 var GlobaltempPercent = 50;
 var GlobalflowPercent = 65;

 var Globaltemp;
 var Globalflow;

var tripleclick = false;
var spigot = true;
var hot = false;

var mapRange = function(from, to, s) {
  return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
};

User = {
  name: "User",
  tag: 0,
  temp:150, // percent of full range
  flow:150,
  angleXY:50,
  angleZ:30,
  heat:false,
  spigot:true,
  //metric:true,//if true uses metric units
  //localization:"en-us",//string for language
};

var hotNHeavy = Object.create(User);
hotNHeavy.name = "Hot & Heavy";
hotNHeavy.tag = 1;
hotNHeavy.temp = 180;
hotNHeavy.flow = 256;

var coldShower = Object.create(User);
coldShower.name = "Cold Shower"
coldShower.tag = 2;
coldShower.temp = 32;
coldShower.flow = 256;
coldShower.angleZ = 20;

var niceNGood = Object.create(User);
niceNGood.name = "Nice & Good";
niceNGood.tag = 3;
niceNGood.flow = 128;
niceNGood.temp = 150;

var gentle = Object.create(User);
gentle.name = "Gentle";
gentle.tag = 4;
gentle.flow = 32;
gentle.temp = 148;

var defaultUser = Object.create(User);

var User1 = Object.create(User);
User1.name = User1;
User1.tag = 5;

var listOfUsers = [defaultUser, hotNHeavy, coldShower,niceNGood, gentle, User1];
/*var a = [];
a.forEach(function(entry) {
    var singleObj = {}
    singleObj['type'] = User;
    singleObj['value'] = entry;
    listOfUsers.push(singleObj);
});*/


var currentUser = Object.create(User);

//$('.slider').slider(); 

var myflow = function(User){
  return User.flow;
};

var mytemp = function(User){
  return User.temp;
}
/*var  hexFromRB = function(r, b) {
    var hex = [
      (r).toString( 16 ),
      "0",
      (b).toString( 16 )
    ];
    $.each( hex, function( nr, val ) {
      if ( val.length === 1 ) {
        hex[ nr ] = "0" + val;
      }
      if (val == 0x100){
        val = "FF"
      }
    });
    return hex.join( "" ).toUpperCase();
  };

  var refreshWater = function( q) {
    var red = q;
      blue = 256 - q;
      hex = hexFromRB( red, blue );
      css1 = "background-color:" +"#"+ hex;
      console.log(hex);
    $( "#shower" ).css({css1});
    //$( "#temp" ).ui-slider-range{background-color: "#"+hex};
  */
 var refreshWater = function (q) {
  var r = parseInt(q, 10),
      g = parseInt(0, 10),
      b = parseInt(256-q, 10);
        if(spigot){
            document.getElementById('shower').style.backgroundColor = 'rgb('+r+', '+g+', '+b+')';
            document.getElementById('bath').style.backgroundColor = 'rgb(112,112,112)';
        }else{
            document.getElementById('bath').style.backgroundColor = 'rgb('+r+', '+g+', '+b+')';
            document.getElementById('shower').style.backgroundColor = 'rgb(112,112,112)';
}
}  ;

var mapWater = function(q){
  return mapRange([1,255],[4,50],q).toFixed(2);
}

var mapFlow =  function(q){
  return mapRange([1,255],[0,9.5],q).toFixed(2);
}

 //flow slider
 $(function() {
    $( "#slider-flow" ).slider({
      orientation: "vertical",
      range: "min",
      min: 1,
      max: 255,
      value: myflow(currentUser),
      create: function(event, ui){
        ui.value = myflow(currentUser);
        $( "#amount" ).val( mapFlow(ui.value) + " L/m" );
      },
      slide: function( event, ui ) {
        $( "#amount" ).val( mapFlow(ui.value) + " L/m" );
        Globalflow = ui.value;
        //console.log(Globalflow);
        //$( "#amount" ).val( "12 L/m");//Globalflow );
      }
    });
    $( "#amount" ).val( $( "#slider-flow" ).slider( "value" ) );
    });

//temp slider
 $(function() {
    $( "#slider-temp" ).slider({
      orientation: "vertical",
      range: "min",
      min: 1,
      max: 255,
      value: 128,
      create: function(event, ui){
        ui.value = mytemp(currentUser);
        $( "#temp" ).val( mapWater(ui.value) + " C" );
      },
      slide: function( event, ui ) {
        Globaltemp = ui.value;
        //console.log(Globaltemp);
        //$( "#temp" ).val( "28 C");//Globaltemp );
        //changeBackground(ui.value);
        refreshWater(ui.value);
        $( "#temp" ).val( mapWater(ui.value) + " C" );
        if(hot == false){
            if(ui.value>=200){
            ui.value = 199;
            Globaltemp=199;
            refreshWater(199);
            $("#temp").val(mapWater(199) + " C");
          }
            //$("#slider-temp").slider("value", 199);
        }
      }
    });
    $( "#temp" ).val( $( "#slider-temp" ).slider( "value" ) );
    });

    $(function() {
    $( "#controls" ).draggable({ containment: "parent" });
  });

    $(function() {
    $( "#clock" ).draggable({ containment: "parent" });
  });

    $(function() {
    $( "#user-menu" ).draggable({ containment: "parent" });
  });
    $(function() {
    $( "#selectable" ).selectable();
  });

//BUTTENS!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
 $(function() {
    $( "#3fingers" )
      .button()
      .click(function( event ) {
        //event.preventDefault();
        //tripleclick = true;
        $("#controls").show("fold");
      });
 });

//$("#hide").css({ width: '25px', height: '25px', 'padding-top': '10px', 'padding-bottom': '10px' });
 $(function() {
    $( "#hide" )
      .button()
      .click(function( event ) {
        //event.preventDefault();
        $("#controls").hide("fold");
      });
  });

  $(function() {
    $( "#bath-toggle" )
      .button()
      .click(function( event ) {
        //event.preventDefault();
        if(spigot){
          spigot = false;
          $('#bathstat').text("bath");
          document.getElementById('bath').style.backgroundColor = document.getElementById('shower').style.backgroundColor;
          document.getElementById('shower').style.backgroundColor = 'rgb(112,112,112)';
       }else{
          spigot = true;
          $('#bathstat').text("shower");
         document.getElementById('shower').style.backgroundColor = document.getElementById('bath').style.backgroundColor;
          document.getElementById('bath').style.backgroundColor = 'rgb(112,112,112)';
        }//tripleclick = true;
        //$("#controls").show("fold");
      });
 });

$(function() {
    $( "#enable-hot" )
      .button()
      .click(function( event ) {
        //event.preventDefault();
        //$("#controls").hide("fold");
        if(hot==false){
            hot=true;
        }else{
          hot=false;
          if(Globaltemp>=200)
          Globaltemp=199;
          refreshWater(199);
          $("#temp").val(mapWater(199) + " C");
          $("#slider-temp").slider("value", 199);
        }
      });
  });




var userpick = document.getElementById('handprint2');
for(var i = 0; i < listOfUsers.length; i++) {
    var u = listOfUsers[i];
    var el = document.createElement("option");
    el.textContent = u.name;
    el.value = u;
    userpick.appendChild(el);
}


$(function() {
$("#handprint").button()
      .click(function( event ) {
        currentUser = userpick.options[userpick.selectedIndex].value;
        console.log(currentUser.name);
  });
});

$(function() {
    $( "#showclock" )
      .button()
      .click(function( event ) {
        //event.preventDefault();
        //tripleclick = true;
        $("#clock").show("fold");
      });
 });

$(function() {
    $( "#chide" )
      .button()
      .click(function( event ) {
        //event.preventDefault();
        $("#clock").hide("fold");
      });
  });

$(function() {
    $( "#4fingers" )
      .button()
      .click(function( event ) {
        //event.preventDefault();
        //tripleclick = true;
        $("#user-menu").show("fold");
      });
 });

$(function() {
    $( "#uhide" )
      .button()
      .click(function( event ) {
        //event.preventDefault();
        $("#user-menu").hide("fold");
      });
  });

//$( "#handprint2" ).selectmenu();//{ style: "dropdown", width:140 });
/*_renderMenu: function( handprint2, listOfUsers ) {
  var that = this;
  $.each( listOfUsers, function( index, item ) {
    that._renderItemData( handprint2, item );
  });
  //$( ul ).find( "li:odd" ).addClass( "odd" );
}*/

//$( "#handprint2" ).on( "selectmenuselect", function( event, ui ) { currentuser = ui.value} );




  /*$( "#Main" ).click(function(event) {
      if(tripleclick){
        console.log(event.pageX , event.pageY);
      $( "#controls" ).offset({top: event.pageX, left: event.pageY});
            tripleclick = false;
          }
}); */
 /*(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;

  var _ = document.getElementById.bind(document);

  var rect = new fabric.Rect({
    width: 100,
    height: 100,
    top: 100,
    left: 100,
    fill: 'rgba(255,0,0,0.5)'
  });

  canvas.add(rect);

  var angleControl = _('angle-control');
  angleControl.onchange = function() {
    rect.setAngle(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  var scaleControl = _('scale-control');
  scaleControl.onchange = function() {
    rect.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
  };

  var topControl = _('top-control');
  topControl.onchange = function() {
    rect.setTop(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  var leftControl = _('left-control');
  leftControl.onchange = function() {
    rect.setLeft(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  function updateControls() {
    scaleControl.value = rect.getScaleX();
    angleControl.value = rect.getAngle();
    leftControl.value = rect.getLeft();
    topControl.value = rect.getTop();
  }
  canvas.on({
    'object:moving': updateControls,
    'object:scaling': updateControls,
    'object:resizing': updateControls,
    'object:rotating': updateControls
  });
})();*/

