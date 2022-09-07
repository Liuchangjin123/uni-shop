<template>
	<view class="container">
		<view class="login-container">
			<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
			<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
			<text class="tips-text">登陆后尽享更多权益</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			// 获取用户的基本信息
			async getUserProfile() {
				const res = await uni.getUserProfile({
					desc: "登录"
				})
				if (res[0]) return uni.$showMsg("您取消了授权")
				// console.log(res[1])
				this.updateUserInfo(res[1].userInfo)

				this.getToken(res[1])
			},
			async getToken(info) {
				// 获取code
				const [err, res] = await uni.login().catch(err => err)
				// console.log(res)
				if (err || res.errMsg !== 'login:ok')
					return uni.$showMsg('登录失败')
				// console.log(res.code)
				// console.log(info)

				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// console.log(query)
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				console.log(loginResult)
				if (loginResult.meta.status == 200) return uni.$showMsg('登录失败！')
				// uni.$showMsg('登陆成功！')
				// this.updateToken(loginResult.message.token)
				// 自定义token
				this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.')

				this.navigateBack()
			},
			navigateBack() {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;

		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
