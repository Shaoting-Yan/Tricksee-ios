import React, {useCallback,useState,useRef,useEffect} from "react";
import "./Looper.css";

export default function InfiniteLooper(props) {
    const [looperInstances, setLooperInstances] = useState(1);
    const outerRef = useRef(null);
    const innerRef = useRef(null);

    const setupInstances = useCallback(() => {
        if (!innerRef?.current || !outerRef?.current) return;

        const { width } = innerRef.current.getBoundingClientRect();

        const { width: parentWidth } = outerRef.current.getBoundingClientRect();

        const instanceWidth = width / innerRef.current.children.length;

        if (width < parentWidth + instanceWidth) {
            setLooperInstances(looperInstances + Math.ceil(parentWidth / width));
        }
  }, [looperInstances]);

    useEffect(() => {
        setupInstances();
    }, []);

    return (
      <div className="looper" ref={outerRef}>
        <div className="looper__innerList" ref={innerRef}>
          {[...Array(looperInstances)].map((_, ind) => (
            <div
              key={ind}
              className="looper__listInstance"
              style={{
                animationDuration: `${props.speed}s`,
                animationDirection: props.direction === "right" ? "reverse" : "normal",
              }}
            >
              {props.children}
            </div>
          ))}
        </div>
      </div>
    );
  }