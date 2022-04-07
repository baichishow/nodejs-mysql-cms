const express = require('express');
const router = express.Router();
// 数据库
let pool = require('../../config/mysql');

/**
 * @apiDefine Authorization
 * @apiHeader {String} Authorization 登录或者注册之后返回的token，请在头部headers中设置Authorization: `Bearer ${token}`.
 */

/**
 * @api {get} /role/list 获取角色列表
 * @apiName RoleList
 * @apiGroup Role
 * @apiPermission 后台系统
 *
 * @apiQuery { Number } [pagesize=10] 每一页数量.
 * @apiQuery { Number } [pageindex=1] 第几页.
 *
 * @apiUse Authorization
 *
 * @apiSampleRequest /role/list
 */

router.get('/list', async (req, res) => {
    let { pagesize = 10, pageindex = 1 } = req.query;
    // 计算偏移量
    pagesize = parseInt(pagesize);
    let offset = pagesize * (pageindex - 1);
    // 查询
    let sql = `SELECT id, role_name AS name FROM role LIMIT ? OFFSET ?; SELECT COUNT(*) as total FROM role`;
    let [results] = await pool.query(sql, [pagesize, offset]);
    // 获取成功
    res.json({
        status: true,
        msg: "获取成功！",
        ...results[1][0],
        data: results[0],
    });
});

/**
 * @api {post} /role 添加角色
 * @apiName InsertRole
 * @apiGroup Role
 * @apiPermission 后台系统
 *
 * @apiUse Authorization
 *
 * @apiBody {String} name 角色名称.
 *
 * @apiSampleRequest /role
 */

router.post('/', async (req, res) => {
    let { name } = req.body;
    let sql = `INSERT INTO role (role_name) VALUES (?)`;
    let [{ insertId }] = await pool.query(sql, [name]);
    res.json({
        status: true,
        msg: "success!",
        data: {
            id: insertId
        }
    });
});

/**
 * @api {delete} /role/:id 删除角色
 * @apiName DeleteRole
 * @apiGroup Role
 * @apiPermission 后台系统
 *
 * @apiUse Authorization
 *
 * @apiParam {String} id 角色id.
 *
 * @apiExample {js} 参数示例:
 * /role/3
 *
 * @apiSampleRequest /role
 */

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    // 获取一个连接
    const connection = await pool.getConnection();

    try {
        // 开启事务
        await connection.beginTransaction();
        // 删除角色
        let delete_role_sql = `DELETE FROM role WHERE id = ?`;
        let [{ affectedRows: role_affected_rows }] = await pool.query(delete_role_sql, [id]);
        if (role_affected_rows === 0) {
            await connection.rollback();
            res.json({ status: false, msg: "删除role失败！" });
            return;
        }
        // 删除role_menu关联表数据
        let delete_menu_sql = `DELETE FROM role_menu WHERE role_id = ?`
        let [{ affectedRows: menu_affected_rows }] = await pool.query(delete_menu_sql, [id]);
        if (menu_affected_rows === 0) {
            await connection.rollback();
            res.json({ status: false, msg: "删除关联菜单role_menu失败！" });
            return;
        }
        // 删除admin_role关联表数据
        let delete_admin_sql = `DELETE FROM admin_role WHERE role_id = ?`
        let [{ affectedRows: admin_affected_rows }] = await pool.query(delete_admin_sql, [id]);
        if (admin_affected_rows === 0) {
            await connection.rollback();
            res.json({ status: false, msg: "删除关联管理员admin_role失败！" });
            return;
        }
        // 一切顺利，提交事务
        await connection.commit();
        // 设置成功
        res.json({
            status: true,
            msg: "删除成功！"
        });
    } catch (error) {
        await connection.rollback();
        throw error;
    }
});

/**
 * @api {put} /role/:id 更新角色
 * @apiName UpdateRole
 * @apiGroup Role
 * @apiPermission 后台系统
 *
 * @apiUse Authorization
 *
 * @apiParam {String} id 角色id.
 * @apiBody {String} name 角色名称.
 *
 * @apiExample {js} 参数示例:
 * /role/3
 *
 * @apiParamExample {json} body参数:
 *     {
 *       "name": '库管',
 *     }
 * @apiSampleRequest /role
 */

router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let { name } = req.body;
    let sql = `UPDATE role SET role_name = ? WHERE id = ?`;
    let [{ affectedRows }] = await pool.query(sql, [name, id]);
    if (!affectedRows) {
        res.json({
            status: false,
            msg: "fail！"
        });
        return;
    }
    res.json({
        status: true,
        msg: "success!",
    });
});

/**
 * @api {get} /role/menu/tree 根据角色获取侧边栏菜单--树形结构
 * @apiName RoleMenuTree
 * @apiGroup Role
 * @apiPermission 后台系统
 *
 * @apiUse Authorization
 *
 * @apiQuery {Number} id 角色id.
 *
 * @apiSampleRequest /role/menu/tree
 */
router.get('/menu/tree', async (req, res) => {
    let { id } = req.query;
    let sql = `SELECT m.*, i.name AS 'icon_name' FROM MENU m JOIN role_menu rm ON rm.menu_id = m.id LEFT JOIN ICON i ON m.icon_id = i.id WHERE rm.role_id = ? ORDER BY menu_order;`;
    let [results] = await pool.query(sql, [id]);
    // 筛选出一级菜单
    let cate_1st = results.filter((item) => item.pId === 1);
    // 转换为树形结构--递归函数
    const parseToTree = function (list) {
        return list.map((parent) => {
            let children = results.filter((child) => child.pId === parent.id);
            if (children.length) {
                return { ...parent, children: parseToTree(children) }
            } else {
                return { ...parent }
            }
        });
    }
    // 生成树形菜单
    let tree_menu = parseToTree(cate_1st);
    //成功
    res.json({
        status: true,
        msg: "获取成功!",
        data: tree_menu
    });
});

/**
 * @api {get} /role/menu/list 根据角色获取侧边栏菜单--扁平数组
 * @apiName RoleMenuList
 * @apiGroup Role
 * @apiPermission 后台系统
 *
 * @apiUse Authorization
 *
 * @apiQuery {Number} id 角色id.
 *
 * @apiSampleRequest /role/menu/list
 */

router.get('/menu/list', async (req, res) => {
    let { id } = req.query;
    let sql = `SELECT m.*, i.name AS 'icon_name' FROM MENU m JOIN role_menu rm ON rm.menu_id = m.id LEFT JOIN ICON i ON m.icon_id = i.id WHERE rm.role_id = ? ORDER BY menu_order;`;
    let [results] = await pool.query(sql, [id]);
    //成功
    res.json({
        status: true,
        msg: "获取成功!",
        data: results
    });
});

/**
 * @api {post} /role/menu 为角色配置菜单
 * @apiName SetRoleMenu
 * @apiGroup Role
 * @apiPermission 后台系统
 *
 * @apiUse Authorization
 *
 * @apiBody {Number} id 角色id.
 * @apiBody {Number[]} menus 菜单id数组.
 *
 * @apiSampleRequest /role/menu
 */

router.post('/menu', async (req, res) => {
    let { id, menus: insert_menus } = req.body;
    //获取现有菜单id
    const select_sql = 'SELECT menu_id FROM `role_menu` WHERE role_id = ?';
    let [exist_menus] = await pool.query(select_sql, [id]);
    exist_menus = exist_menus.map((item) => item.menu_id);
    //计算两个数组的差集
    let rest_exist_menus = exist_menus.filter((item) => {
        return !insert_menus.includes(item);
    });
    let rest_insert_menus = insert_menus.filter((item) => {
        return !exist_menus.includes(item);
    });
    //转化数组格式
    rest_insert_menus = rest_insert_menus.map((item) => `(${id},${item})`);

    // 获取一个连接
    const connection = await pool.getConnection();

    try {
        // 开启事务
        await connection.beginTransaction();
        //根据rest_exist_menus删除数据，数组为空,不需要删除数据
        if (rest_exist_menus.length) {
            let delete_sql = `DELETE FROM role_menu WHERE role_id = ? AND menu_id IN (${rest_exist_menus.toString()});`
            let [{ affectedRows: menu_affected_rows }] = await pool.query(delete_sql, [id]);
            if (menu_affected_rows === 0) {
                await connection.rollback();
                res.json({ status: false, msg: "删除原有menu失败！" });
                return;
            }
        }
        //根据rest_insert_menus插入数据，数组为空,不需要插入数据
        if (rest_insert_menus.length) {
            let insert_sql = `INSERT INTO role_menu (role_id, menu_id) VALUES ${rest_insert_menus.toString()}`;
            let [{ affectedRows: menu_affected_rows }] = await pool.query(insert_sql);
            if (menu_affected_rows === 0) {
                await connection.rollback();
                res.json({ status: false, msg: "插入menu失败！" });
                return;
            }
        }
        // 一切顺利，提交事务
        await connection.commit();
        // 设置成功
        res.json({
            status: true,
            msg: "设置成功"
        });
    } catch (error) {
        await connection.rollback();
        throw error;
    }
});

module.exports = router;