#include "iostream.h"
#include "iomanip.h"
int main()
{
    int a[2][3] ;
    　　　　int i, j ;      //循环控制

    　　　　for( i = 0; i < 2; i++ )        //输入数据
        　　　　for( j = 0; j < 3; j++ )
        　　　　　　cin >> a[i][j] ;

   　　　　 for( i = 0; i < 2; i++ )        //将数组中的元素全部输出
        　　　　for( j = 0; j < 3; j++ )
            　　　　cout << a[i][j] <<" " ;

    　　　　return 0 ;
}