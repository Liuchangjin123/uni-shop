export default {
	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: '',
		// 用户的信息对象
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		token: uni.getStorageSync('token') || '',
		redirectInfo: null
	}),

	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
			// console.log(state.redirectInfo)
		}
	},

	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.cityName + state.address
				.detailInfo
		}
	}
}
