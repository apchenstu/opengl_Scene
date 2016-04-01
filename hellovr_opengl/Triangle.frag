#version 440 core
in vec2 TexCoord;
out vec4 color;
uniform sampler2D ourTexture;

void main()
{
	//vec4 ImgCoord = gl_TexCoord[0];
	//color=vec4(ImgCoord.st,0,1);
	color=texture2D(ourTexture,TexCoord);
	//	gl_FragColor = texture2D(ourTexture,SoCoord.yx) ;
}
