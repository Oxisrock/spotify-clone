import Slider from 'react-slick';
const Filters = (props) => {
    const settings = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        center: '0',
        initialSlide: 0,
        dots:true,
        arrows:true,
      responsive: [
        {
            breakpoint: 2000,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots:true,
              arrows:true
            }
          },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots:true,
            arrows:false
          }
        },
        {
            breakpoint: 780,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 0,
              dots:false,
              arrows:true
            }
          },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 0,
            dots:true,
            arrows:false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots:false,
            arrows:true
          }
        }
      ]
    };
    return (
        <div>
            <Slider {...settings}>
                {props.tracks.map((track) => (
                    <div key={track.track.id}>
                        <div className='track-single'>
                            <div className='track-images'>
                                <img src={track.track.album.images[0].url} alt='' className='track-image' />
                            </div>
                            <div className='track-info'>
                                <h2><span className='text-bold'>{track.track.name}</span></h2>
                                <h3><span className='text-regular'>{track.track.album.name}</span></h3>
                                <h4><span className='text-semiregular'>{track.track.artists[0].name}</span></h4>
                            </div>
                        </div>
                    </div>
                ))
                }
            </Slider>
        </div>
    );
}
export default Filters;
