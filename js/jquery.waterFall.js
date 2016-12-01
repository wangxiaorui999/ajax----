
// 吧此文件 设计成 jquery的插件
// 参数 我们需要列间距 参数是一个对象
$.fn.waterFall=function(option){  
	//  如果用户不传参数 则默认参数 为 gap:15
	
	var  data=$.extend( {gap:15}, option );

	// 初始化  缓存this
	var _this=$(this);
	// 获取所有的 item
	var items=_this.children();
 	//  获取列宽
	var width=items.width();
	// 获取有多少列
	var count=Math.floor(_this.width()/(width+data.gap));
	// 定义一个数组  用来分别记录 5列的当前高度
	var column=[];

	var height=0;

	// 本质 就是给所有的盒子 设置坐标值
	 // top 第一个 行 为 0 剩下的 取 五列中的最小值
	 // left   index*(width+data.gap)

	items.each(function(index,e){
		//  记录当前遍历 图片的高度
		height=$(e).height();
		// 如果是第一行
		if(index<count){
			$(e).css({
				top:0,
				left:index*(width+data.gap)
			});
			//  把图片的高度 记录到column[]zhong 
			column[index]=height;
		}else{
			// 找到最小的高度的列 吧图片放进去

			var minHeight=column[0];
			var minKey=0;

			for(var i=0;i<column.length;i++){
				if(minHeight>column[i]){
					//  记录最小值 和最小索引
					minHeight=column[i];
					minKey=i;
				}
			}

			// 找的最小高度的列 添加
			
			$(e).css({
				top:minHeight,
				left:minKey*(width+data.gap)
			})
			// 改变 column
			column[minKey]+=$(e).height();

		}

	})

	// 找出column中 最高的高度 作为父盒子的高度
	// 
	var  maxHeight=column[0];
	for(var i=0;i<column.length;i++){
		if(maxHeight<column[i]){
			//  记录最大值
			maxHeight=column[i];		
		}
	}

	_this.height(maxHeight+50);


	


}