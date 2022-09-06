import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import modulUser from '@/store/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		'm_cart': moduleCart,
		'm_user': modulUser
	}
})

export default store
