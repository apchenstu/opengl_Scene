#version 440 core
layout (location = 0) in vec3 position;
layout (location = 1) in vec2 texCoord;
uniform mat4 view;
uniform mat4 projection;
out vec2 TexCoord;
out mat4 view_project;

void main()
{
	gl_Position = projection * vec4(position,1.0f);
	//gl_Position =  vec4(position,1.0f);
	TexCoord = vec2(texCoord.x,texCoord.y);
	view_project =  view;
}
