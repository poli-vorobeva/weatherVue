import {ActionContext, ActionPayload} from "vuex";
import {IState} from "../components/dto/dto.state";

interface IDragState {
	draggedElement: number,
	enteredElement: number
}

interface IDragStore {
	state: () => IDragState,
	namespaced: boolean,
	mutations: {},
	actions: {}
}

export const dragStore: IDragStore = {
	namespaced: true,
	state() {
		return {
			draggedElement: null,
			enteredElement: null,
		}
	},
	mutations: {
		setEnteredElement(state: IDragState, payload: number) {
			state.enteredElement = payload
		},
		setDraggedElement(state: IDragState, payload: number) {
			state.draggedElement = payload
		}

	},
	actions: {
		onDrop(context: ActionContext<IDragState, IState>, payload: number) {
			context.commit('setDraggedElement', payload)
			context.commit('reOrderCities', {to: context.state.enteredElement, from: context.state.draggedElement}, {root: true})
		}
	},
}