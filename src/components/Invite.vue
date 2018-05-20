<template>
	<div id="ask">
		<group>
			<x-input id="ask_invite" ref="mobile" name="mobile" v-model="mobile" placeholder="请填写邀请码" :max="6" keyboard="number" is-type="china-mobile" required></x-input>
		</group>
	</div>
</template>

<script>
	import { XInput, Group, XButton } from 'vux'
	
	export default {
		name:'ask',
		components:{
			XInput,
			Group,
			XButton
		}
	}

</script>

<style>
</style>