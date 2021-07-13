/**
 * @author alteredq / http://alteredqualia.com/
 */

function Clock( autoStart ) {

	this.autoStart = ( autoStart !== undefined ) ? autoStart : true;

	this.startTime = 0;
	this.oldTime = 0; // 上一帧的时间点
	this.elapsedTime = 0;

	this.running = false;

}

Object.assign( Clock.prototype, {

	start: function () {

		this.startTime = ( typeof performance === 'undefined' ? Date : performance ).now(); // see #10732

		this.oldTime = this.startTime;
		this.elapsedTime = 0;
		this.running = true;

	},

	stop: function () {

		this.getElapsedTime();
		this.running = false;
		this.autoStart = false;

	},

	getElapsedTime: function () {

		this.getDelta(); // 把当前帧的用时也算进去
		return this.elapsedTime;

	},

	getDelta: function () {

		var diff = 0;

		if ( this.autoStart && ! this.running ) {

			this.start();
			return 0;

		}

		if ( this.running ) {

			var newTime = ( typeof performance === 'undefined' ? Date : performance ).now();

			diff = ( newTime - this.oldTime ) / 1000;
			this.oldTime = newTime;

			this.elapsedTime += diff;

		}

		return diff;

	}

} );


export { Clock };
