import {
	mapGetters
} from 'vuex'

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	watch: {
		total() {
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			if (this.total > 0) {
				uni.setTabBarBadge({
					index: 2,
					text: this.total + ''
				})
			} else return
		}
	}
}
