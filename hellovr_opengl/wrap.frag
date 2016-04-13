

layout (shared,row_major) uniform;
uniform sampler2D tex;
/*
uniform Blocks
{

	float A;
	float B;
	vec3 rang;
};*/

float pi = acos(-1);
float A = 100.0 * 2 * pi / 360;
float B = 70.0 * 2 * pi / 360;
vec3 rang=vec3(0.0,0,0);



    void main(void)
    {
	    const float pi = acos(-1.0);
	    vec4 ImgCoord = gl_TexCoord[0];
		ImgCoord.y = 1.0-ImgCoord.y;
		ImgCoord = ImgCoord*2-1;


		float tx = rang.x;
		float ty = rang.y;
		float tz = rang.z;

		mat3 rotatex = mat3(1,0,0,0,cos(tx),sin(tx),0,-sin(tx),cos(tx));
		mat3 rotatey = mat3(cos(ty),0,-sin(ty),0,1,0,sin(ty),0,cos(ty));
		mat3 rotatez = mat3(cos(tz),sin(tz),0,-sin(tz),cos(tz),0,0,0,1);

		vec3 CamCoord = normalize(rotatex*rotatey*rotatez*vec3(cos(A/2),sin(A/2)*ImgCoord.x , sin(B/2)*ImgCoord.y  ) );

	//	vec3 CamCoord = normalize(rotatex*rotatey*rotatez*vec3(1,ImgCoord.x*tan(A/2),ImgCoord.y*tan(B/2)) );

		vec2 SCoord = vec2(acos(CamCoord.z)/pi,atan(CamCoord.y/CamCoord.x)*2/pi) ;

		if (CamCoord.x >=0)
		{
		    SCoord.y = SCoord.y/2.0 -0.5;
		} else
		{
	    	SCoord.y = SCoord.y/2.0 +0.5;
		}

		vec2 SoCoord = vec2(SCoord.x , (SCoord.y+1)/2.0);





	//gl_FragColor = vec4(SoCoord.x,SoCoord.x,SoCoord.x,1) ;
		gl_FragColor = texture2D(tex,SoCoord.yx) ;


    };
