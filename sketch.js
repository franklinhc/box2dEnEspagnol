// virtual world

// box2D world
let world;
let SCALE = 30;
let myObjects = [];
let myBoundaries = [];
let amount = 100;


function setup() {
    createCanvas(500, 500);

    // setup world
    var   b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2MassData = Box2D.Collision.Shapes.b2MassData
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    ;


    world = new b2World(
        new b2Vec2(0, 10)    //gravity
        ,  true              //allow sleep
    );

    myBoundaries.push(new Box2DBondary(width / 4, height-100, width/2, 10, 0.1));
    myBoundaries.push(new Box2DBondary(width / 2, height/2, 10, 100, 1.1));
    myBoundaries.push(new Box2DBondary(5, height/2, 10, height,0));
    myBoundaries.push(new Box2DBondary(width-5, height/2, 10, height,0));

    console.log("cantidad de myBoundaries: " + myBoundaries.length);


    // Building a colection of falling objects ---------------
    let maxSize = 10;
    for(let i = 0; i < amount; ++i) {
        if (random() > 0.5) {
            let miXAh = random() * width;
            let miYAh = random() * height/2;
            let miWah = random() * maxSize;
            let miHah = random() * maxSize;
            let myCurrentObj = new Box2DBox(miXAh, miYAh, miWah, miHah);
            myObjects.push(myCurrentObj);
        } else {
            let miXAho = random() * width;
            let miYAho = random() * height/2;
            let miZs   = random() * maxSize;
            let myCurrentObj2 = new Box2DCircle(miXAho, miYAho, miZs);
            myObjects.push(myCurrentObj2);
        }
    }

    console.log("cantidad de objetos: " + myObjects.length);

} // end setup




function draw() {
    background(70);

    // drawing Boundaries
    for (let i = 0; i < myBoundaries.length; i++) {
        myBoundaries[i].draw();
    }

    // drawing objects
    for (let i = 0; i < myObjects.length; i++) {
        myObjects[i].draw();
        if (myObjects[i].done()) {
            myObjects.splice(i, 1);
        }
    }

    world.Step(
        1 / 60   //frame-rate
        ,  10       //velocity iterations
        ,  10       //position iterations
    );

    fill (200);
    text("frameRate:   " + round(frameRate()), 20, width-20);
} // end draw