// import { useEffect, useState } from "react";
// import NotFoundMessage from "./NotFoundMessage";
import MyResponsiveRadar from "./MyResponsiveRadar";
import styles from "./ResultView.module.css";

const ResultView = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>진단결과</h1>
      <div className={styles.result}>
        <div className={styles.summary}>
          <h1>
            <strong>건성</strong>에 해당합니다.
          </h1>
          <p className={styles.detail}>
            두피의 유·수분 밸런스 조절 두피와 모발에 풍부한 수분을 공급하는
            모이스처 라인의 제품으로 보습력을 높여주고, 트리트먼트나 천연 두피
            팩으로 윤기를 더해 두피의 유·수분 균형을 맞추는 것이 중요합니다.
          </p>
        </div>
        <MyResponsiveRadar />
        <div className={styles.tips}>
          <ul>
            <li>
              <div>
                <h3>매일 꼼꼼히 두피 마사지할 것</h3>
                <p>
                  지성 두피는 피지선 자극을 최소화하기 위해 두피 마사지를 줄여야
                  하지만, 건성 두피는 반대로 피지선을 자극해 유분을 적당히
                  분비할 수 있도록 수시로 두피 마사지를 해야 한답니다. 손가락
                  끝을 이용해 두피 구석구석을 주물러주면 되는데요. 특히 잠들기
                  전과 샴푸 전후에 효과가 좋습니다. 손가락 마사지가 서툴다면
                  대빗으로 여러 차례 빗어주거나 두피를 톡톡 두드려주세요. 혹은
                  스트레칭으로 목과 어깨 부분을 풀어주어도 좋습니다. 이 모든
                  방법은 두피의 혈액순환을 한결 원활하게 해 피지선을 자극하는
                  것에 도움을 준답니다.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>두피 토닉, 에센스로 충분한 영양 부여</h3>
                <p>
                  건성 두피가 장기간 개선되지 못한다면 유분은 물론 영양분까지
                  부족하다는 신호입니다. 수시로 에센스나 토닉으로 영양분을
                  풍부하게 부여해야 하는데요. 두피에서 분비되는 각질 때문에
                  트러블이 생겼다면 진정 효과가 있는 민트, 티트리, 녹차 성분의
                  토닉을 사용하고 두피가 건조해 따끔거리거나 화끈거린다면
                  히알루론산 등을 함유해 효과적으로 수분을 부여할 수 있는
                  에센스를 사용하는 것이 좋습니다.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>샴푸는 저자극, 자연 유래 성분 함유 제품으로</h3>
                <p>
                  마지막으로 건성 두피는 세정력이 강한 샴푸도 피해야 합니다.
                  유분기 하나 없이 보송보송한 두피를 만들어주는 샴푸는 건조한
                  두피를 더욱 메마르게 할 뿐이니까요. 보통 세정력이 강한 샴푸는
                  산성에 가까운 pH 지수를 띄고 있습니다. pH 지수 5.0에서 6.0
                  사이의 약산성 제품을 선택한다면 두피에 자극을 최소화할 수 있을
                  거예요. 더불어 계면활성제, 실리콘, 파라벤, 인공 색소, 인공
                  향료 등 화학성분이 들어있는 샴푸 또한 두피를 자극하니 화학성분
                  대신 자연 유래 성분 듬뿍 담은 샴푸를 선택하는 것이 좋습니다.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
