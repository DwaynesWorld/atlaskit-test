import React from "react";
import rafSchedule from "raf-schd";

const containerDivStyle: React.CSSProperties = {
  width: "100%",
  position: "relative"
};

// Not using styled-components here for performance
// and framework-agnostic reasons.
const sizerStyle: React.CSSProperties = {
  display: "block",
  position: "absolute",
  top: 0,
  left: 0,
  height: 0,
  width: "100%",
  opacity: 0,
  overflow: "hidden",
  pointerEvents: "none",
  zIndex: -1
};

interface Props {
  children: (width?: number) => React.ReactNode;
  onResize?: (width: number) => void;
  /** Optional styles to be applied to the containing element */
  containerStyle?: React.CSSProperties;
}

interface State {
  width?: number;
}

// add a definition for a data field to the resize object
// since HTMLElements do not have this.
interface ResizeObject extends HTMLObjectElement {
  data: string;
  contentDocument: HTMLDocument;
}

export default class WidthDetector extends React.Component<Props, State> {
  state: State = {};
  container?: HTMLDivElement;
  resizeObjectDocument?: Window;
  resizeObject?: ResizeObject;

  handleResize = rafSchedule(() => {
    const { container } = this;
    if (!container) return;

    const width = container.offsetWidth;
    this.setState({ width });

    if (this.props.onResize) {
      this.props.onResize(width);
    }
  });

  componentDidMount() {
    if (this.resizeObject) {
      this.resizeObject.data = "about:blank";
    }
    // Calculate width first time, after object has loaded.
    // Prevents it from getting in a weird state where width is always 0.
    this.handleResize();
  }

  componentWillUnmount() {
    this.handleResize.cancel();

    if (this.resizeObjectDocument) {
      this.resizeObjectDocument.removeEventListener(
        "resize",
        this.handleResize
      );
    }
  }

  handleContainerRef = (ref: HTMLDivElement) => {
    if (!ref) return;
    this.container = ref;
  };

  handleObjectRef = (ref: ResizeObject) => {
    if (!ref) return;

    this.resizeObject = ref;
  };

  handleObjectLoad = () => {
    if (!this.resizeObject) return;

    this.resizeObjectDocument = this.resizeObject.contentDocument
      .defaultView as Window;
    this.resizeObjectDocument.addEventListener("resize", this.handleResize);
    this.handleResize();
  };

  render() {
    // TODO: Check this impl, should be a better way
    const sizerEl = (
      <object
        className="width-detector-sizer"
        type="text/html"
        style={sizerStyle}
        ref={this.handleObjectRef}
        onLoad={this.handleObjectLoad}
        aria-label="none"
        aria-hidden
        tabIndex={-1}
      />
    );
    // pluck non-DOM props off the props so we can safely spread remaining items
    const {
      containerStyle: _containerStyle,
      onResize,
      children,
      ...props
    } = this.props;
    const containerStyle = _containerStyle || {};

    return (
      <div
        className="width-detector"
        {...props}
        style={{ ...containerDivStyle, ...containerStyle }}
        ref={this.handleContainerRef}>
        {children(this.state.width)}
        {sizerEl}
      </div>
    );
  }
}
