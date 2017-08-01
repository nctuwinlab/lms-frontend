import createjs from 'createjs-cmd';
import { TweenLite } from 'gsap';

export default class LoginFormBg{
    constructor(){
        setTimeout(
            () => this.init(),
        1000);
    }


    init(){
        this.StageInit();
        this.CirclesInit();
        this.TextInit();
        this.animate();
        this.createText();
    }

    StageInit(){
        let textStage = new createjs.Stage("text");
        textStage.canvas.width = 1600;
        textStage.canvas.height = 200;
        this.textStage = textStage;

        let stage = new createjs.Stage("stage");
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        this.stage = stage;
    }

    TextInit() {
        let text = new createjs.Text("t", "80px 'Source Sans Pro'", "#100");
        text.textAlign = 'center';
        text.x = 300;
        this.text = text;
    }

    CirclesInit(){
        this.circles = [];
        let colors = ['#B2949D', '#FFF578', '#FF5F8D', '#37A9CC', '#188EB2'];
        for(let i=0; i<600; i++) {
            let circle = new createjs.Shape();
            let r = 7;
            let x = window.innerWidth*Math.random();
            let y = window.innerHeight*Math.random();
            let color = colors[Math.floor(i%colors.length)];
            let alpha = 0.2 + Math.random()*0.5;
            circle.alpha = alpha;
            circle.radius = r;
            circle.graphics.beginFill(color).drawCircle(0, 0, r);
            circle.x = x;
            circle.y = y;
            this.circles.push(circle);
            this.stage.addChild(circle);
            circle.movement = 'float';
            this.TweenCircle(circle);
        }
    }

    createText() {
        //let fontSize = 860/(t.length);
        //if (fontSize > 160) fontSize = 160;
        let fontSize = 160;
        let { text, textStage } = this;
        text.text = 'WELCOME';
        text.font = "900 "+fontSize+"px 'Source Sans Pro'";
        text.textAlign = 'center';
        text.x = 400;
        text.y = (172-fontSize)/2;
        textStage.addChild(text);
        textStage.update();

        let ctx = document.getElementById('text').getContext('2d');
        let pix = ctx.getImageData(0,0,1600,200).data;
        this.textPixels = [];
        for (let i = pix.length-1; i >= 0; i -= 4) {
            if (pix[i] != 0) {
                let x = (i / 4) % 1600;
                let y = Math.floor(Math.floor(i/1600)/4);

                if((x && x%8 == 0) && (y && y%8 == 0)) 
                    this.textPixels.push({x: x, y: y});
            }
        }
        this.formText();
    }

    formText(){
        let { textPixels, circles } = this;
        for(let i= 0, l=textPixels.length; i<l; i++) {
            circles[i].originX = textPixels[i].x;
            circles[i].originY = textPixels[i].y;
            this.TweenCircle(circles[i], 'in');
        }
        if(textPixels.length < circles.length) {
            for(let j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 0.1});
            }
        }
    }

    animate(){
        this.stage.update();
        requestAnimationFrame(this.animate.bind(this));
    }
    
    TweenCircle(c, dir){
        if(c.tween) c.tween.kill();
        if(dir == 'in'){
            c.tween = TweenLite.to(
                c, 
                0.4, 
                {   
                    x:      c.originX, 
                    y:      c.originY, 
                    ease:   Quad.easeInOut, 
                    alpha:  1, 
                    radius: 5, 
                    scaleX: 0.4, 
                    scaleY: 0.4, 
                    onComplete: () => {
                        c.movement = 'jiggle';
                        this.TweenCircle(c);
                    }
                }
            );
        } else if(dir == 'out'){
            c.tween = TweenLite.to(
                c, 
                0.8, 
                {   
                    x:      window.innerWidth*Math.random(), 
                    y:      window.innerHeight*Math.random(), 
                    ease:   Quad.easeInOut, 
                    alpha:  0.2 + Math.random()*0.5, 
                    scaleX: 1, 
                    scaleY: 1, 
                    onComplete: () => {
                        c.movement = 'float';
                        this.TweenCircle(c);
                    }
                }
            );
        } else {
            if(c.movement == 'float'){
                c.tween = TweenLite.to(
                    c, 
                    5 + Math.random()*3.5, 
                    {
                        x:     c.x + -100+Math.random()*200, 
                        y:     c.y + -100+Math.random()*200, 
                        ease:  Quad.easeInOut, 
                        alpha: 0.2 + Math.random()*0.5,
                        onComplete: () => {
                            this.TweenCircle(c);
                        }
                    }
                );
            } else {
                c.tween = TweenLite.to(
                    c, 
                    0.05, 
                    {
                        x:    c.originX + Math.random()*3, 
                        y:    c.originY + Math.random()*3, 
                        ease: Quad.easeInOut,
                        onComplete: () => {
                            this.TweenCircle(c);
                        }
                    }
                );
            }
        }
    }
}

