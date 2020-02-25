import React from "react";
import classNames from "classnames";
import { DropdownContext } from "./dropdown-context";

export interface DropdownProps {
  className?: string;
  children: any;
  fullWidth?: boolean;
}

export interface DropdownState {
  isOpen: boolean;
  toggleRegionWidth: number;
}

export class UnstyledDropdown extends React.Component<
  DropdownProps,
  DropdownState
> {
  private dropdownToggleRef: React.RefObject<any> = React.createRef();
  private dropdownMenuRef: React.RefObject<any> = React.createRef();
  private dropdownToggleRegionRef: React.RefObject<any> = React.createRef();

  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      isOpen: false,
      toggleRegionWidth: 0
    };
    if (props.children.length !== 2) {
      throw new Error("Dropdown requires dropdown toggle and dropdown menu");
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.toggleClose);
    setTimeout(
      () =>
        this.setState({
          toggleRegionWidth: (this.dropdownToggleRegionRef
            .current as Element).getBoundingClientRect().width
        }),
      250
    );
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.toggleClose);
  }

  toggleClose = (event: any) => {
    if (
      this.dropdownToggleRef.current &&
      !this.dropdownToggleRef.current.contains(event.target) &&
      this.dropdownMenuRef.current &&
      !this.dropdownMenuRef.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  };

  forceClose = () => this.setState({ isOpen: false });

  handleToggleFromMenu = (event: any) => {
    /* prevent the dropdown menu from hiding if the user clicks somewhere inside the menu container, but not on a link in the menu */
    if (!(event.target.className as string).includes("dropdown-menu")) {
      this.setState((prevState, props) => {
        return { isOpen: !prevState.isOpen };
      });
    }
  };

  handleToggle = (event: any) => {
    const toggleDropdown = () => {
      this.setState(prevState => {
        return { isOpen: !prevState.isOpen };
      });
    };
    event.preventDefault();
    /* immediately recalculate width of toggle region, then trigger the open/close animation, with the dropdown toggle button pointer */
    this.setState(
      {
        toggleRegionWidth: (this.dropdownToggleRegionRef
          .current as Element).getBoundingClientRect().width
      },
      toggleDropdown
    );
  };

  render() {
    //inner ref is used for styled components and ref should be used if dom element
    //currently only supporting inner ref as there isn't a use case yet for ref
    const dropdownToggle = React.cloneElement(
      this.props.children[0],
      {
        onClick: this.handleToggle,
        ref: this.dropdownToggleRef,
        className: classNames("dropdown-toggle", {
          "dropdown-active": this.state.isOpen
        }),
        togglewidth: this.state.toggleRegionWidth
      },
      this.props.children[0].props.children
    );

    const dropdownMenu = React.cloneElement(
      this.props.children[1],
      {
        isOpen: this.state.isOpen,
        onClick: this.handleToggleFromMenu,
        ref: this.dropdownMenuRef,
        className: classNames("dropdown-menu", {
          "dropdown-active": this.state.isOpen
        })
      },
      this.props.children[1].props.children
    );

    return (
      <DropdownContext.Provider value={this.forceClose}>
        <li
          className={classNames(this.props.className, "dropdown-upgraded", {
            "dropdown-active": this.state.isOpen
          })}
          ref={this.dropdownToggleRegionRef}>
          {dropdownToggle}
          {dropdownMenu}
        </li>
      </DropdownContext.Provider>
    );
  }
}
