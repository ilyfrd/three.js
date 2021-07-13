export default /* glsl */`
#ifdef USE_MAP

	vec4 texelColor = texture2D( map, vUv );

	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor; // 物体本身的颜色 texelColor 通过map采样得到，而非通过顶点颜色属性得到。

#endif
`;
