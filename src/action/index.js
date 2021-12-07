
import { ADD_LESSON, DELETE_LESSON } from "../consts";
export let addLesson = data => ({ type: ADD_LESSON, data });
export let deleteLesson = data => ({ type: DELETE_LESSON, data });