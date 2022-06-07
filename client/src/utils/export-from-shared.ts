export {
	encryptPassword, // RSA加密密码
	flattenMenuTree, // 摊平菜单树方法挪到shared里了，顺便通过文件夹的正确层级解决从shared引入方法报错的问题
	PUBLIC_KEY, // 公钥
	SPECIAL_ROLE
} from 'shared/client-util';
