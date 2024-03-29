import Theme from "../core/theme.js";

import Style from "../core/style.js";
import {BORDER, COLORS} from "../core/constants.js";

class Space extends Theme {
	static DEFAULT_MAP = {
		Screen: new Style({
			backgroundColor: COLORS.BG.BLACK,
			color: COLORS.FG.WHITE
		}),
		Window: new Style({
			border: BORDER.DOUBLE
		}),
		Text: new Style(),
		Input: new Style({
			border: BORDER.SINGLE
		}),
		Button: new Style({
			border: BORDER.SINGLE
		}),
		List: new Style({
			border: BORDER.SINGLE,
			selectedBackgroundColor: COLORS.BG.BLACK,
			selectedColor: COLORS.FG.WHITE,
			selectedUnderline: true,
			activeBackgroundColor: COLORS.BG.WHITE,
			activeColor: COLORS.FG.BLACK,
			activeUnderline: false
		}),
		ScrollBar: new Style({
			border: BORDER.SINGLE,
			trackCharacter: String.fromCharCode(0x2592),
			trackColor: COLORS.FG.WHITE,
			thumbCharacter: String.fromCharCode(0x2588),
			thumbColor: COLORS.FG.WHITE
		})
	};

	static DEFAULT_FOCUS_MAP = {
		Button: new Style({
			border: BORDER.SINGLE,
			backgroundColor: COLORS.BG.WHITE,
			color: COLORS.FG.BLACK
		})
	};

	constructor(map = Space.DEFAULT_MAP, focusMap = Space.DEFAULT_FOCUS_MAP) {
		super(map, focusMap);
	}
}
export default Space;
