<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "pages/style.scss";
	@import "uview-plus/index.scss";
	
	.uni-page-head {
		.uni-page-head__title {
			font-weight: unset;
			font-size: 18px!important;
		}
		
		.uni-page-head-btn {
			svg {
				width: 28px!important;
				height: 28px!important;
			}
		}
	}
	
	.u-subsection__item__text {
		font-size: 14px!important;
	}
	
	.u-subsection--button__bar {
		background-color: var(--dominColor)!important;
	}

	.u-action-sheet__header {
		padding: 20px 30px!important;
		
		.uicon-close {
			display: none!important;
		}

		.u-action-sheet__header__title {
			font-size: 20px!important;
			font-weight: unset!important;
		}
	}

	img.csssprite {
		display: none!important;
	}

	.message-view .ua__markdown * {
		margin: unset!important;
		font-size: 16px!important;
	}

	.uni-scroll-view-refresher {
		left: 0;
		width: 100%;
		z-index: 999999!important;
		position: absolute!important;
	}

    .uni-textarea-placeholder,.uni-textarea-textarea, textarea {
        text-align: left;
    }
</style>
