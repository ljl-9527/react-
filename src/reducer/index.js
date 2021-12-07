
import { ADD_LESSON, DELETE_LESSON } from "../consts";

let defaultState = { 
	lesson:[]
    // lesson: [
    //     {
	// 		"_id": 1,
	// 		"img": "/static/img/lesson/01.jpg",
	// 		"title": "梁炯麟Javscript进阶课程123123121",
	// 		"sales": "12345",
	// 		"price": "50.00",
	// 		"type": "react"
	// 	},
	// 	{
	// 		"_id": 2,
	// 		"img": "/static/img/lesson/02.jpg",
	// 		"title": "梁炯麟Javscript进阶课程",
	// 		"sales": "12345",
	// 		"price": "210.00",
	// 		"type": "vue"
	// 	},
	// 	{
	// 		"_id": 3,
	// 		"img": "/static/img/lesson/03.jpg",
	// 		"title": "梁炯麟Javscript进阶课程",
	// 		"sales": "12345",
	// 		"price": "100.00",
	// 		"type": "super"
	// 	},
		
    // ] 
}

export default function reducer(state = defaultState, action) {
    let result = Object.assign({}, state);
    switch(action.type) {
        case ADD_LESSON:
            // console.log('add',action);
			if(isNaN(action.data.price)) {
				alert('无法加入购物车')
			} else {
				result.lesson.push(action.data);
			}
            break;
        case DELETE_LESSON:
            // console.log('delete');
			let index = result.lesson.findIndex(item => item._id === action.data._id);
				if(index >= 0) {
					result.lesson.splice(index,1);
				} else {
					alert('该课程不存在，无法删除');
				}
            break;
            default:;
    }
    return result
}