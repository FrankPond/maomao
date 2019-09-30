export default {
    path : '/movie',
    component : () => import('@/views/Movie'),
    // 二级路由
    children : [
        {
            path : 'city',
            component : () => import('@/components/City')
        },
        {
            path : 'nowPlaying',
            component : () => import('@/components/NowPlaying')
        },
        {
            path : 'comingSoon',
            component : () => import('@/components/ComingSoon')
        },
        {
            path : 'search',
            component : () => import('@/components/Search')
        },
        {   //动态路由
            path : 'detail/1/:movieId',
            components : {
                default : ()=> import('@/components/NowPlaying'),
                detail : ()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {   
            path : 'detail/2/:movieId',
            components : {
                default : ()=> import('@/components/ComingSoon'),
                detail : ()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {   //动态路由
            path : 'buyTicket/1/:movieId',
            components : {
                default : ()=> import('@/components/NowPlaying'),
                detail : ()=> import('@/views/Movie/buyTicket')
            },
            props : {
                detail : true
            }
        },
        {   //动态路由
            path : 'buyTicket/2/:movieId',
            components : {
                default : ()=> import('@/components/ComingSoon'),
                detail : ()=> import('@/views/Movie/buyTicket')
            },
            props : {
                detail : true
            }
        },
        {
            path : '/movie',
            redirect : '/movie/nowPlaying'
        }
    ]
}