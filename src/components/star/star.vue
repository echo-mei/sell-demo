<template>
	<div class="star" :class="starType"> 
		<span v-for="starClass in starClasses" :class="starClass" class="itemClass" track-by="$index"></span>
	</div>
</template>

<script>
const LEN = 5
export default {

props: {
	size: {
		type: Number
	},
	score: {
		type: Number
	}
},
computed: {
	starType () {
		return 'star-' + this.size
	},
	starClasses () {
		let result = []
		let fullStarNum = Math.floor(this.score * 2) / 2
		let onLen = Math.floor(fullStarNum)
		let halfFlag = (fullStarNum * 2) % 2 !== 0
		for (var i = 0; i < onLen; i++) {
			result[i] = 'on'
		}
		if (halfFlag) {
			result[onLen] = 'half'
		}
		while (onLen < LEN) {
			result[onLen] = 'off'
			onLen++
		}

		return result
	}
}
}
</script>

<style scoped lang="less">
@import "../../common/less/mixin.less";
.star{
	display:inline-block;
	font-size:0;

	.itemClass{
		display:inline-block;
		background-size:100%;
		background-repeat: no-repeat;
		&:last-child{
			margin-right:0;
		}
	}

}
.star-48{
	.itemClass{
		width:20px;
		height:20px;
		margin-right:22px;

	}
	.on{
		.bg-image('star48_on');
	}
	.half{
		.bg-image('star48_half');
	}
	.off{
		.bg-image('star48_off');
	}
}
.star-36{
	.itemClass{
		width:18px;
		height:18px;
		margin-right:20px;
	}
	.on{
		.bg-image('star36_on');
	}
	.half{
		.bg-image('star36_half');
	}
	.off{
		.bg-image('star36_off');
	}
}
.star-24{
	.itemClass{
		width:16px;
		height:16px;
		margin-right:18px;
	}
	.on{
		.bg-image('star24_on');
	}
	.half{
		.bg-image('star24_half');
	}
	.off{
		.bg-image('star24_off');
	}
}
</style>