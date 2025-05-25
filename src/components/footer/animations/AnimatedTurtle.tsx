import Turtle from "./turtle";
const AnimatedTurle = () => (
  <div className="absolute bottom-0 left-0 z-50 animate-walk">
    <div className="animate-bob">
      <Turtle />
    </div>
  </div>
);

export default AnimatedTurle;
