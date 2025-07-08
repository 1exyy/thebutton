export const MAX_LEVELS: number = 10;
export const MIN_LEVEL: number = 1;

export enum LOGIC {
    SLIDE_LEFT = 'slide_left',
    RUNS_AWAY = 'runs_away',
    BOUNCE_AWAY = 'bounce_away',
    HIDE_ON_HOVER = 'hide_on_hover',
    DISAPPEAR_RANDOM = 'disappear_random',
    INVISIBLE_BUTTON = 'invisible_button',
    BLINKING_BUTTON_RANDOM = 'blinking_button_random',
    DELAYED_CLICK_TIMED = 'delayed_click_timed',
    MIRRORED_MOVEMENT = 'mirrored_movement',
    DISAPPEAR_HARDCORE = 'disappear_hardcore'
}

export const LOGIC_BY_LEVEL: { [key: number]: LOGIC } = {
    1: LOGIC.SLIDE_LEFT,
    2: LOGIC.RUNS_AWAY,
    3: LOGIC.BOUNCE_AWAY,
    4: LOGIC.HIDE_ON_HOVER,
    5: LOGIC.DISAPPEAR_RANDOM,
    6: LOGIC.INVISIBLE_BUTTON,
    7: LOGIC.BLINKING_BUTTON_RANDOM,
    8: LOGIC.DELAYED_CLICK_TIMED,
    9: LOGIC.MIRRORED_MOVEMENT,
    10: LOGIC.DISAPPEAR_HARDCORE

};

export const LEVEL_COMMENTS: { [key: number]: string } = {
    1: "so easy?",
    2: "something new",
    3: "again?",
    4: "you lose the button?",
    5: "so hard",
    6: "where is a button?",
    7: "where is ur reaction",
    8: "where is ur reaction x2",
    9: "mirror?",
    10: "impossible"
};