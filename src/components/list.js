import Component from "../core/component.js";
import Position from "../core/position.js";
import {CURSOR} from "../core/constants.js";
import {DEFAULT as ThemeDefault} from "../themes/index.js";

class List extends Component {
	static NAME = "List";

	static DEFAULT_POSITION = new Position();
	static DEFAULT_STYLE = ThemeDefault.DEFAULT_MAP[List.NAME];
	static DEFAULT_FOCUS_STYLE = ThemeDefault.DEFAULT_FOCUS_MAP[List.NAME];

	constructor({
		id = "",
		label = "",
		position = null,
		style = null,
		focusStyle = null,
		items = [],
		selectedIndex = -1,
		activeIndex = 0,
		autoSelect = false,
		onSelect = null,
		onChange = null
	}) {
		super({
			id,
			label,
			focusable: true,
			focusStyle: focusStyle ? this.focusStyle : List.DEFAULT_FOCUS_STYLE ? List.DEFAULT_FOCUS_STYLE.clone() : null,
			focusTrap: false,
			children: null,
			position: position ? position : List.DEFAULT_POSITION ? List.DEFAULT_POSITION.clone() : null,
			style: style ? style : List.DEFAULT_STYLE ? List.DEFAULT_STYLE.clone() : null
		});

		this.items = items;
		this.selectedIndex = selectedIndex;
		this.activeIndex = activeIndex;
		this.autoSelect = autoSelect;
		this.onSelect = onSelect;
		this.onChange = onChange;

		this._longestItem = 0;
		this._reactiveProps = [...this._reactiveProps, "items", "selectedIndex", "activeIndex"];

		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoIndex = this.gotoIndex.bind(this);
		this._selectIndex = this._selectIndex.bind(this);
	}

	clone() {
		const {id, label, _children: children, focusable, focusTrap, focusStyle, position, style, items, selectedIndex, activeIndex, autoSelect, onSelect, onChange} = this;
		return new List({
			id,
			label,
			children,
			focusable,
			focusTrap,
			focusStyle: focusStyle ? focusStyle.clone() : null,
			position: position.clone(),
			style: style.clone(),
			items,
			selectedIndex,
			activeIndex,
			autoSelect,
			onSelect,
			onChange
		});
	}

	computePosition(parentDetails, overrides = {}) {
		if (!this._needsRender) {
			return;
		}
		const {position, items, _computedStyle} = this;
		const hasBorder = _computedStyle.border !== null;

		this._longestItem = Math.max(...items.map((item) => item.length));
		if (position.width <= 0) {
			overrides.width = this._longestItem + position.paddingLeft + position.paddingRight;
			if (hasBorder) {
				overrides.width += 2;
			}
		}
		if (position.height <= 0) {
			overrides.height = items.length + position.paddingTop + position.paddingBottom;
			if (hasBorder) {
				overrides.height += 2;
			}
		}
		super.computePosition(parentDetails, overrides);
	}

	drawSelf() {
		const {items, selectedIndex, activeIndex, _computedPosition, _computedStyle, _longestItem} = this;
		const {innerX: x} = _computedPosition;
		const {y, height, contentY} = _computedPosition.getScrollContentRange();
		const {backgroundColor, color, selectedBackgroundColor, selectedColor} = _computedStyle;

		const {stdout} = process;
		stdout.write(CURSOR.RESET);
		stdout.write(backgroundColor);
		stdout.write(color);

		for (let i = 0; i < height; i++) {
			const itemIndex = contentY + i;
			switch (itemIndex) {
				case selectedIndex:
					stdout.write(CURSOR.RESET);
					stdout.write(selectedBackgroundColor);
					stdout.write(selectedColor);
					break;
				case activeIndex:
					stdout.write(CURSOR.RESET);
					stdout.write(CURSOR.UNDERLINE);
					stdout.write(backgroundColor);
					stdout.write(color);
					break;
				case selectedIndex + 1:
				case activeIndex + 1:
					stdout.write(CURSOR.RESET);
					stdout.write(backgroundColor);
					stdout.write(color);
					break;
			}

			stdout.cursorTo(x, y + i);
			const item = items[itemIndex];
			const remainingLen = _longestItem - item.length;
			stdout.write(item + " ".repeat(remainingLen));
		}

		//Move cursor to active
		stdout.cursorTo(x, y + (activeIndex - contentY));
	}

	gotoPrevious() {
		this.gotoIndex(this.activeIndex - 1);
	}

	gotoNext() {
		this.gotoIndex(this.activeIndex + 1);
	}

	gotoIndex(index) {
		const newIndex = Math.max(0, Math.min(this.items.length - 1, index));
		if (newIndex !== this.activeIndex) {
			this.activeIndex = newIndex;
			if (this.onChange) {
				this.onChange({
					activeIndex: this.activeIndex,
					activeItem: this.items[this.activeIndex]
				});
			}
			if (this.autoSelect) {
				this._selectIndex(this.activeIndex);
			}
		}
	}

	_selectIndex(index) {
		this.selectedIndex = index;
		if (this.onSelect) {
			this.onSelect({
				selectedIndex: this.selectedIndex,
				selectedItem: this.items[this.selectedIndex]
			});
		}
	}

	onKeyPress(str, key) {
		switch (key.name) {
			case "up":
				this.gotoPrevious();
				if (this._parent) {
					this._parent.onKeyPress(str, key);
				}
				break;
			case "down":
				this.gotoNext();
				if (this._parent) {
					this._parent.onKeyPress(str, key);
				}
				break;
			case "return":
				this._selectIndex(this.activeIndex);
				break;
			default:
				if (this._parent) {
					this._parent.onKeyPress(str, key);
				}
				break;
		}
	}
}
export default List;
