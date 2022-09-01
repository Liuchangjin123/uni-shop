<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchHandler">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bgcolor: {
				type: String,
				default: "#007aff"
			},
			radius: {
				type: Number,
				default: 18 //px
			}
		},
		name: "my-search",
		data() {
			return {

			};
		},
		methods: {
			searchHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		// background-color: #007aff;
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 10px;

		.my-search-box {
			height: 36px;
			background-color: #fff;
			// border-radius: 18px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>
