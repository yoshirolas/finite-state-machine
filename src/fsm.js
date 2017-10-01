class FSM {
    constructor(config) {
        this.states = config.states;
        this.currentState = config.initial;
        this.historyOfStates = [this.currentState];
        this.arrStates = ['normal', 'busy', 'hungry', 'sleeping'];
    }

    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.currentState = state;
        this.historyOfStates.push(this.currentState);
        var count = 0;
        for (var i = 0; i < this.arrStates.length; i++) {
            if (state === this.arrStates[i]) {
                count = 1;
            }
        }
        if (count === 0) {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.currentState === 'normal' && event === 'study') {
            this.currentState = 'busy';
            this.historyOfStates.push(this.currentState);
        }
        if (this.currentState === 'busy' && event === 'get_tired') {
            this.currentState = 'sleeping';
            this.historyOfStates.push(this.currentState);
        }
        if (this.currentState === 'busy' && event === 'get_hungry') {
            this.currentState = 'hungry';
            this.historyOfStates.push(this.currentState);
        }
        if (this.currentState === 'sleeping' && event === 'get_up') {
            this.currentState = 'normal';
            this.historyOfStates.push(this.currentState);
        }
        if (this.currentState === 'sleeping' && event === 'get_hungry') {
            this.currentState = 'hungry';
            this.historyOfStates.push(this.currentState);
        }
        if (this.currentState === 'hungry' && event === 'eat') {
            this.currentState = 'normal';
            this.historyOfStates.push(this.currentState);
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = 'normal'
        this.historyOfStates = [this.currentState];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            return this.arrStates;            
        }
        else if (event === 'study') {
            this.arrStates = ['normal'];
            return this.arrStates;
        }
        else if (event === 'get_hungry') {
            this.arrStates = ['busy', 'sleeping'];
            return this.arrStates; 
        }
        else if (event === 'eat') {
            this.arrStates = ['hungry'];
            return this.arrStates; 
        }
        else if (event === 'get_up') {
            this.arrStates = ['sleeping'];
            return this.arrStates; 
        }
        else if (event === 'get_tired') {
            this.arrStates = ['busy'];
            return this.arrStates; 
        }
        else if (event !== 'study' || 'get_hungry' || 'eat' || 'get_up' || 'get_tired') {
            this.arrStates = [];
            return this.arrStates;
        }

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
