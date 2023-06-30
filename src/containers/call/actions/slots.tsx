import {callService} from '../services';

export const slotActions = {
    getSlots
};

function getSlots(payload: any) {
    return callService.getSlots(payload).then((response: any) => {
        return response
    }).catch((error: any) => {
        return error
    });
}
