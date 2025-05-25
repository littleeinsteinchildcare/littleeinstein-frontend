import Dog from "./dog";

const AnimatedDog = () => (
  <div className="absolute top-[3px] left-0 z-50 animate-walk">
    <div className="animate-bob">
      <Dog />
    </div>
  </div>
);

export default AnimatedDog;
