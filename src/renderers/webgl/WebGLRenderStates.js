/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { WebGLLights } from './WebGLLights.js';

function WebGLRenderState() {

	var lights = new WebGLLights();

	var lightsArray = [];
	var shadowsArray = [];

	function init() {

		lightsArray.length = 0;
		shadowsArray.length = 0;

	}

	function pushLight( light ) {

		lightsArray.push( light );

	}

	function pushShadow( shadowLight ) {

		shadowsArray.push( shadowLight );

	}

	function setupLights( camera ) {

		lights.setup( lightsArray, shadowsArray, camera );

	}

	var state = {
		lightsArray: lightsArray,
		shadowsArray: shadowsArray,

		lights: lights
	};

	return {
		init: init,
		state: state,
		setupLights: setupLights,

		pushLight: pushLight,
		pushShadow: pushShadow
	};

}

function WebGLRenderStates() {

	var renderStates = new WeakMap();

	function onSceneDispose( event ) {

		var scene = event.target;

		scene.removeEventListener( 'dispose', onSceneDispose );

		renderStates.delete( scene );

	}

	function get( scene, camera ) { // 获取某个场景中某个camera对应的渲染状态（同一个场景中的不同camera可能使用不同的渲染状态，渲染出不同的图像风格）

		var renderState;

		if ( renderStates.has( scene ) === false ) {

			renderState = new WebGLRenderState();
			renderStates.set( scene, new WeakMap() );
			renderStates.get( scene ).set( camera, renderState );

			scene.addEventListener( 'dispose', onSceneDispose );

		} else {

			if ( renderStates.get( scene ).has( camera ) === false ) {

				renderState = new WebGLRenderState();
				renderStates.get( scene ).set( camera, renderState );

			} else {

				renderState = renderStates.get( scene ).get( camera );

			}

		}

		return renderState;

	}

	function dispose() {

		renderStates = new WeakMap();

	}

	return {
		get: get,
		dispose: dispose
	};

}


export { WebGLRenderStates };
