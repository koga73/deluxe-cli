import Theme from "../core/theme.js";

import Style from "../core/style.js";
import {BORDER, COLORS} from "../core/constants.js";

class LavaBit extends Theme {
	static DEFAULT_MAP = {
		Screen: new Style({
			backgroundColor: COLORS.BG.RED,
			color: COLORS.FG.BLACK,
			labelBackgroundColor: COLORS.BG.WHITE,
			labelColor: COLORS.FG.BLACK
		}),
		Window: new Style({
			border: BORDER.DOUBLE,
			borderColor: COLORS.FG.BLACK,
			labelBackgroundColor: COLORS.BG.WHITE,
			labelColor: COLORS.FG.BLACK
		}),
		Text: new Style(),
		Input: new Style({
			border: BORDER.SINGLE,
			backgroundColor: COLORS.BG.WHITE,
			color: COLORS.FG.BLACK
		}),
		Button: new Style({
			border: BORDER.SINGLE,
			backgroundColor: COLORS.BG.WHITE,
			color: COLORS.FG.BLACK
		}),
		List: new Style({
			border: BORDER.SINGLE,
			backgroundColor: COLORS.BG.WHITE,
			color: COLORS.FG.BLACK,
			selectedBackgroundColor: COLORS.BG.WHITE,
			selectedColor: COLORS.FG.BLACK,
			selectedUnderline: true,
			activeBackgroundColor: COLORS.BG.BLACK,
			activeColor: COLORS.FG.WHITE,
			activeUnderline: false
		}),
		ScrollBar: new Style({
			border: BORDER.SINGLE,
			backgroundColor: COLORS.BG.WHITE,
			color: COLORS.FG.BLACK,
			trackCharacter: String.fromCharCode(0x2592),
			trackColor: COLORS.FG.WHITE,
			thumbCharacter: String.fromCharCode(0x2588),
			thumbColor: COLORS.FG.BLACK
		})
	};

	static DEFAULT_FOCUS_MAP = {
		Button: new Style({
			border: BORDER.SINGLE,
			backgroundColor: COLORS.BG.BLACK,
			color: COLORS.FG.WHITE
		})
	};

	constructor(map = LavaBit.DEFAULT_MAP, focusMap = LavaBit.DEFAULT_FOCUS_MAP) {
		super(map, focusMap);
	}
}
export default LavaBit;
