<template>
	<view>
		<!-- 搜索框-->
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none">
			</uni-search-bar>
		</view>

		<!-- 搜索建议 -->
		<view class="sugg-list">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchResults: []
			};
		},
		methods: {
			// 输入事件处理函数
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.kw.length === 0) {
					this.searchResults = []
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				console.log(this.searchResults)
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 12px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
