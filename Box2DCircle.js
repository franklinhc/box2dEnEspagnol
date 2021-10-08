/**
 * Created by franklinhc on 9/5/15.
 */

function Box2DCircle ( x,  y,  r) {
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2Vec2 = Box2D.Common.Math.b2Vec2;

    this.miX = 0;
    this.miY = 0;

    this.fixDef = new b2FixtureDef;
    this.fixDef.density = 1.0;
    this.fixDef.friction = 0.5;
    this.fixDef.restitution = 0.2;
    this.bodyDef = new b2BodyDef;
    this.bodyDef.type = b2Body.b2_dynamicBody;
    this.fixDef.shape = new b2CircleShape(r/ SCALE);
    this.bodyDef.position.x = x/ SCALE;
    this.bodyDef.position.y = y/ SCALE;

    this.Object = world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
    this.Object.GetBody().SetUserData(this);

    this.update = function() {
        this.miX = this.Object.GetBody().GetPosition().x * SCALE;
        this.miY = this.Object.GetBody().GetPosition().y * SCALE;
    };

    this.applyImpulse = function(degrees, power) {
        this.Object.GetBody().ApplyImpulse(
            new b2Vec2(cos(degrees * (PI / 180)) * power, sin(degrees * (PI / 180)) * power),
            this.Object.GetBody().GetWorldCenter());
    };

    this.draw = function(ctx) {
        this.update();

        let alpha = 0.3;
        fill (51, 151, 0, 50);
        stroke (51, 151, 0, 150);
        circle (this.miX , this.miY , r);

    };

    this.contains = function (mousePVec) {
        return (this.fixDef.shape.TestPoint(this.Object.GetBody().GetTransform(), mousePVec)) ;
    };

    this.removeBody = function() {
        world.DestroyBody(this.Object.GetBody());
    };

    this.done = function() {
        if (this.miY > canvas.height + r || this.miX < -r || this.miX > canvas.width + r ) {
            world.DestroyBody(this.Object.GetBody());
            return true;
        }
        return false;
    };
}  // end Box2DCircle




