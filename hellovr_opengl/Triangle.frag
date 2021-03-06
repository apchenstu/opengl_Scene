#version 440 core
layout (shared,row_major) uniform;
uniform sampler2D tex;
in vec2 TexCoord;
in mat4 view_project;

	const float pi = acos(-1.0);
	float A = 110.0 * 2 * pi / 360;
	float B = 83.63 * 2 * pi / 360;
//	vec3 rang=vec3(0,0,0);


    void main(void)
    {

	    const float pi = acos(-1.0);
	    vec4 ImgCoord = vec4(TexCoord.xy,0,1);
		ImgCoord.y = 1.0-TexCoord.y;
		ImgCoord = ImgCoord*2-1;

	//	mat3 view=mat3(view_project[0][0],view_project[0][1],view_project[0][2],view_project[1][0],view_project[1][1],view_project[1][2],view_project[2][0],view_project[2][1],view_project[2][2]);
		mat3 view=mat3(view_project[0][0],view_project[1][0],view_project[2][0],view_project[0][1],view_project[1][1],view_project[2][1], view_project[0][2],view_project[1][2],view_project[2][2]);
		mat3 rotatex = mat3(1,0,0,0,cos(pi/2),sin(pi/2),0,-sin(pi/2),cos(pi/2));
		//mat3 rotatey = mat3(cos(pi),0,-sin(pi),0,1,0,sin(pi),0,cos(pi));
		float tx = pi;
		float ty =pi;
		float tz = pi;

		mat3 rotatexx = mat3(1,0,0,0,cos(tx),sin(tx),0,-sin(tx),cos(tx));
		mat3 rotatey = mat3(cos(ty),0,-sin(ty),0,1,0,sin(ty),0,cos(ty));
		mat3 rotatez = mat3(cos(tz),sin(tz),0,-sin(tz),cos(tz),0,0,0,1);

	//	vec3 CamCoord = normalize(view*vec3(cos(A/2),sin(A/2)*ImgCoord.x , sin(B/2)*ImgCoord.y  ) );
		vec3 CamCoord = normalize((rotatex*view*rotatexx*rotatey*vec3(sin(A/2)*ImgCoord.x ,sin(B/2)*(ImgCoord.y) ,cos(A/2) )) );

	//	vec3 CamCoord = normalize(rotatex*rotatey*rotatez*vec3(1,ImgCoord.x*tan(A/2),ImgCoord.y*tan(B/2)) );

		vec2 SCoord = vec2(acos(CamCoord.z)/pi,atan(CamCoord.y/CamCoord.x)*2/pi) ;

		if (CamCoord.x >=0)
		{
		    SCoord.y = SCoord.y/2.0 -0.5;
		} else
		{
	    	SCoord.y = SCoord.y/2.0 +0.5;
		}

		vec2 SoCoord = vec2(SCoord.x ,(SCoord.y+1)/2.0);
		//vec2 SoCoord = vec2(SCoord.x , (SCoord.y+1));




	//gl_FragColor = vec4(SoCoord.x,SoCoord.x,SoCoord.x,1) ;
		gl_FragColor = texture2D(tex,1.0-SoCoord.yx) ;
    };
