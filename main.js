(function() {

    //prevent default behavior
    document.body.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, false);


    function createCanvas(parent, width, height) {
        var canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.context = canvas.node.getContext('2d');
        canvas.node.width = width || 100;
        canvas.node.height = height || 100;
        parent.appendChild(canvas.node);
        return canvas;
    }


    function init(container, width, height, fillColor) {
        var canvas = createCanvas(container, width, height);
        var sounds = [];
        var ctx = canvas.context;
        var colors =['#ff0000', '#00ff00', '#0000FF', '#FF6699','#ffffff', '#000000', '#33ff99', '#99ffdd', '#666666', '#dd77dd'];
        // define a custom fillCircle method
        ctx.fillCircle = function(x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function(fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ddd");

        //touch events
        canvas.node.addEventListener('touchmove', function(e){

          if(!canvas.touchIsDrawing){
            return;
          }

          if(e.touches.length > 0){
            for(var i = 0; i < e.touches.length; i++){
                var x = e.touches[i].clientX - this.offsetLeft;
                var y = e.touches[i].clientY - this.offsetTop;
                var radius = 10; // or whatever
                var fillColor = colors[i];
                ctx.fillCircle(x, y, radius, fillColor);
            }
          }
        });

        canvas.node.addEventListener('touchstart', function(e){
          canvas.touchIsDrawing = true;
          if(e.touches.length > 0){
            for(var i = 0; i < e.touches.length; i++){
              var snd = T("sin").play();
              sounds.push(snd);
            }
          }

        });

        canvas.node.addEventListener('touchmove', function(e){
          if(e.touches.length > 0){
            for(var i = 0; i < e.touches.length; i++){
              sounds[i].set({freq:e.touches[i].clientY + 200});
            }
          }
        });

        canvas.node.addEventListener('touchend', function(e){
          canvas.touchIsDrawing = false;
          console.log(sounds);
          //sound.stop();
          for(var i = 0; i < sounds.length; i++){
            sounds[i].pause();
            sounds[i].removeAll();
          }
          sounds = [];
        });
    }

    var container = document.querySelector('.canvas');
    init(container, document.body.clientWidth, document.body.clientHeight, '#ddd');

})();