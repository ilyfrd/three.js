export default /* glsl */`
#ifdef USE_COLOR

	// 此处diffuseColor.rgb的值是根据光照公式计算得到的值，它跟光源颜色有关，还需要乘以物体本身的颜色，vColor即是物体本身的颜色。参考LearningOpengl
	diffuseColor.rgb *= vColor;

#endif
`;
