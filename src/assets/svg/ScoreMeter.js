const scoreMap = [
  {
    x: 177,
    y: 577,
    r: -90,
    s: 0,
  },
  {
    x: 177,
    y: 577,
    r: -73.64,
    s: 1,
  },
  {
    x: 179,
    y: 566,
    r: -57.28,
    s: 2,
  },
  {
    x: 184,
    y: 554,
    r: -40.92,
    s: 3,
  },
  {
    x: 184,
    y: 554,
    r: -40.92,
    s: 4,
  },
  {
    x: 184,
    y: 554,
    r: -40.92,
    s: 5,
  },
  {
    x: 224.184,
    y: 545.534,
    r: 15,
    s: 6,
  },
  {
    x: 224.184,
    y: 545.534,
    r: 15,
    s: 7,
  },
  {
    x: 224.184,
    y: 545.534,
    r: 15,
    s: 8,
  },
  {
    x: 224.184,
    y: 545.534,
    r: 15,
    s: 9,
  },
  {
    x: 176,
    y: 590,
    r: 90,
    s: 10,
  },
];

function ScoreMeter({ score = 6 }) {
  const { x, y, r, s } = scoreMap[score];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 120 100"
    >
      <defs>
        <filter
          id="Ellipse_1221"
          x="42.962"
          y="55"
          width="30"
          height="29"
          filterUnits="userSpaceOnUse"
        >
          <feOffset input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood flood-color="#293264" flood-opacity="0.098" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g
        id="Group_7630"
        data-name="Group 7630"
        transform="translate(-158.038 -517)"
      >
        <path
          id="Subtraction_4"
          data-name="Subtraction 4"
          d="M15361.182,6433.355a41.091,41.091,0,0,1-8.641-.915c-.437-.094-.875-.2-1.3-.3h19.881c-.446.111-.883.212-1.3.3A41.1,41.1,0,0,1,15361.182,6433.355Zm-34.868-24.215h-3.564a49.9,49.9,0,0,1-2.5-5.518,51.262,51.262,0,0,1-2.515-9.043,52.725,52.725,0,0,1,0-18.8,51.24,51.24,0,0,1,2.515-9.04,49.429,49.429,0,0,1,4.1-8.327,47.834,47.834,0,0,1,5.51-7.3,45.67,45.67,0,0,1,6.711-5.994,43.067,43.067,0,0,1,7.652-4.46,41.117,41.117,0,0,1,33.907,0,43.042,43.042,0,0,1,7.657,4.46,45.682,45.682,0,0,1,6.711,5.994,48.281,48.281,0,0,1,5.514,7.3,49.74,49.74,0,0,1,4.095,8.327,51.1,51.1,0,0,1,2.519,9.04,52.725,52.725,0,0,1,0,18.8,50.839,50.839,0,0,1-2.519,9.043,50.3,50.3,0,0,1-2.5,5.517h-3.567a46.162,46.162,0,0,0,3.242-6.792,47.4,47.4,0,0,0,2.344-8.412,49.08,49.08,0,0,0,0-17.509,47.422,47.422,0,0,0-2.344-8.416,46.348,46.348,0,0,0-3.816-7.75,44.535,44.535,0,0,0-5.134-6.8,42.563,42.563,0,0,0-6.246-5.583,40.351,40.351,0,0,0-7.126-4.15,38.286,38.286,0,0,0-31.57,0,40.281,40.281,0,0,0-7.126,4.15,42.563,42.563,0,0,0-6.246,5.583,44.857,44.857,0,0,0-5.138,6.8,46.267,46.267,0,0,0-3.812,7.75,47.6,47.6,0,0,0-2.345,8.416,49.382,49.382,0,0,0,0,17.509,47.539,47.539,0,0,0,2.345,8.412,46.3,46.3,0,0,0,3.238,6.792Z"
          transform="translate(-15144 -5805.137)"
          fill="rgba(38,38,38,0.06)"
          stroke="rgba(0,0,0,0)"
          stroke-miterlimit="10"
          stroke-width="1"
        />
        <g
          id="Group_7438"
          data-name="Group 7438"
          transform="translate(161.327 520.743)"
        >
          <g
            id="Path_12696"
            data-name="Path 12696"
            transform="translate(88.307 0) rotate(76)"
            fill="none"
            stroke-linecap="round"
            stroke-dasharray="94 700"
          >
            <path
              d="M44.354,91.01c24.321,0,43.72-20.373,43.72-45.5S68.358,0,44.037,0,0,20.373,0,45.5,20.033,91.01,44.354,91.01Z"
              stroke="none"
            />
            <path
              d="M 44.35397338867188 91.00994110107422 C 20.03295135498047 91.00994110107422 1.22631836347864e-05 70.63663482666016 1.22631836347864e-05 45.50494003295898 C 1.22631836347864e-05 45.49795150756836 1.457728467357811e-05 45.49057006835938 1.762542342476081e-05 45.48358535766602 C 1.835859802667983e-05 45.48205184936523 2.099947960232385e-05 45.47769546508789 2.187951213272754e-05 45.47616195678711 C 2.483422758814413e-05 45.47116851806641 2.82707860606024e-05 45.46655654907227 3.27802736137528e-05 45.46156692504883 C 3.54214062099345e-05 45.45849990844727 3.71000096492935e-05 45.45676422119141 4.032845390611328e-05 45.45369720458984 C 4.667259418056346e-05 45.44771194458008 5.301200872054324e-05 45.44266510009766 6.159447366371751e-05 45.43667602539062 C 6.379592377925292e-05 45.43514251708984 6.510109960800037e-05 45.43383407592773 6.744934216840193e-05 45.43230056762695 C 7.811497926013544e-05 45.42531204223633 9.063154720934108e-05 45.41814422607422 0.0001043430529534817 45.41115951538086 C 0.0001102137102861889 45.4080924987793 0.0001125994167523459 45.4072265625 0.0001190570837934501 45.40415954589844 C 0.0001305140758631751 45.39867401123047 0.0001404714130330831 45.39418792724609 0.0001538083015475422 45.38870239257812 C 0.0001611463667359203 45.38563537597656 0.0001631092163734138 45.38484573364258 0.0001710341603029519 45.38178253173828 C 0.0001850545668276027 45.37629318237305 0.0002002977125812322 45.37076950073242 0.0002161975571652874 45.36528396606445 C 0.0002250027027912438 45.36221694946289 0.0002223724441137165 45.36291885375977 0.0002317643229616806 45.35985565185547 C 0.0002528702316340059 45.35287094116211 0.0002778278139885515 45.34519195556641 0.0003019773575942963 45.33821105957031 C 0.0003072599356528372 45.33667755126953 0.0003139387699775398 45.33496475219727 0.0003193680022377521 45.33343505859375 C 0.0003390258061699569 45.32794952392578 0.0003591203421819955 45.32250213623047 0.0003806566528510302 45.31702041625977 C 0.0003926881472580135 45.3139533996582 0.0004027906979899853 45.31145477294922 0.0004154086345806718 45.30839157104492 C 0.0004357632424216717 45.30340576171875 0.0004526908742263913 45.2994270324707 0.0004745976184494793 45.29444122314453 C 0.000481346360174939 45.29291152954102 0.0004998488584533334 45.28866577148438 0.0005067441961728036 45.28713226318359 C 0.0005362317315302789 45.2806510925293 0.0005669474485330284 45.27411270141602 0.0005990574136376381 45.26763153076172 C 0.000606685527600348 45.2661018371582 0.0006184215890243649 45.26377868652344 0.000626196211669594 45.26224517822266 C 0.0006563947536051273 45.25626373291016 0.0006891049561090767 45.25002288818359 0.0007215373916551471 45.24404144287109 C 0.0007298981072381139 45.24250793457031 0.0007524967077188194 45.23847198486328 0.0007610038737766445 45.23694229125977 C 0.0007888065301813185 45.23195648193359 0.0008159621502272785 45.22721481323242 0.0008453157497569919 45.22222900390625 C 0.0008632090757600963 45.21916580200195 0.0008715150761418045 45.21775817871094 0.000889994262252003 45.21469497680664 C 0.0009261490777134895 45.20871353149414 0.0009649451822042465 45.20250701904297 0.001003332901746035 45.19652557373047 C 0.001013158238492906 45.19499206542969 0.001014912500977516 45.19464874267578 0.001024884288199246 45.19311904907227 C 0.00107333401683718 45.18564224243164 0.001116518047638237 45.17925643920898 0.00116845581214875 45.17177963256836 C 0.001189570873975754 45.16871643066406 0.001197840552777052 45.16764068603516 0.001219541183672845 45.16457748413086 C 0.001251401263289154 45.16009140014648 0.001290118554607034 45.15471649169922 0.001323234057053924 45.15023422241211 C 0.001345812925137579 45.14717102050781 0.00136150058824569 45.14506530761719 0.001384664792567492 45.14200210571289 C 0.001418617204762995 45.13751983642578 0.001458578510209918 45.13235473632812 0.001493785995990038 45.12787246704102 C 0.00151782832108438 45.12480926513672 0.001532371621578932 45.12289047241211 0.001556999166496098 45.11983108520508 C 0.001612850814126432 45.11285400390625 0.001666255062445998 45.10637283325195 0.0017251429380849 45.09939956665039 C 0.001750941039063036 45.09634017944336 0.00175601034425199 45.0958251953125 0.001782393548637629 45.0927619934082 C 0.001820946927182376 45.08827972412109 0.001870085718110204 45.08263397216797 0.001909893588162959 45.07815170288086 C 0.00193715444765985 45.07508850097656 0.001960428664460778 45.0724983215332 0.00198827451094985 45.06943893432617 C 0.002028918592259288 45.06495666503906 0.002072180155664682 45.06028366088867 0.002114078495651484 45.05580520629883 C 0.002142801648005843 45.05274200439453 0.002163444180041552 45.05048751831055 0.00219275220297277 45.04742813110352 C 0.002249731216579676 45.04145431518555 0.002307625487446785 45.03549575805664 0.002366833621636033 45.02952194213867 C 0.002397018950432539 45.02645874023438 0.002419097581878304 45.0243034362793 0.002449867781251669 45.02124404907227 C 0.002504992997273803 45.01576614379883 0.002552872523665428 45.01107406616211 0.00260987039655447 45.00559616088867 C 0.002625840017572045 45.00406646728516 0.002681576879695058 44.99878692626953 0.002697692718356848 44.99725723266602 C 0.002750282641500235 44.99227905273438 0.002788552083075047 44.98870849609375 0.002842689165845513 44.98373031616211 C 0.002875797683373094 44.98067092895508 0.002902485895901918 44.97822570800781 0.00293617881834507 44.97516632080078 C 0.002996580442413688 44.96968841552734 0.003047030884772539 44.9652099609375 0.00310930423438549 44.95973205566406 C 0.003126735100522637 44.95820236206055 0.003160297870635986 44.95519638061523 0.003177874721586704 44.95366668701172 C 0.003252274822443724 44.94719696044922 0.003334990702569485 44.94014358520508 0.003412004327401519 44.93367385864258 C 0.00344832637347281 44.93061447143555 0.00348974927328527 44.92722702026367 0.003526655724272132 44.92417144775391 C 0.003580807708203793 44.91969299316406 0.003620272967964411 44.91645431518555 0.003675677347928286 44.9119758605957 C 0.003713459707796574 44.90891647338867 0.00375787285156548 44.90535354614258 0.003796239383518696 44.90229415893555 C 0.003846229752525687 44.89831161499023 0.00389293790794909 44.89465713500977 0.003943917341530323 44.89067459106445 C 0.003983159549534321 44.88761901855469 0.004035213962197304 44.88351821899414 0.004075040109455585 44.88046264648438 C 0.004152807872742414 44.87449264526367 0.004242879338562489 44.86767959594727 0.004322872031480074 44.86170959472656 C 0.004363866057246923 44.8586540222168 0.004434298258274794 44.85351181030273 0.00447587575763464 44.85045623779297 C 0.00451661366969347 44.84746932983398 0.004569051787257195 44.8436279296875 0.004610346164554358 44.84064483642578 C 0.004652799107134342 44.83758544921875 0.004737104754894972 44.83156204223633 0.00478014163672924 44.8285026550293 C 0.004815248306840658 44.82601928710938 0.004864837508648634 44.82253265380859 0.004900330677628517 44.82004547119141 C 0.004965760745108128 44.81546020507812 0.005012879148125648 44.81214904785156 0.005079621914774179 44.80756378173828 C 0.005115810316056013 44.80507659912109 0.005156259052455425 44.80235290527344 0.00519283302128315 44.79986572265625 C 0.00532719399780035 44.79069519042969 0.00540924584493041 44.78521728515625 0.005548856686800718 44.77605056762695 C 0.00558666605502367 44.77356338500977 0.005623110570013523 44.77114105224609 0.005661305505782366 44.76865386962891 C 0.005731548182666302 44.76406860351562 0.005800618324428797 44.75965118408203 0.005872173234820366 44.75506591796875 C 0.005903284996747971 44.75307846069336 0.005939756520092487 44.75075149536133 0.005971115548163652 44.74876403808594 C 0.006043544970452785 44.74417877197266 0.0061340038664639 44.73846817016602 0.006207745056599379 44.73388290405273 C 0.006223733071237803 44.73289108276367 0.00623307703062892 44.73232650756836 0.006249126512557268 44.73133087158203 C 0.006445769686251879 44.71910858154297 0.006600887048989534 44.70970916748047 0.00680685555562377 44.69748687744141 C 0.006815219763666391 44.69699096679688 0.006812379229813814 44.69715118408203 0.006820759270340204 44.6966552734375 C 0.006897997576743364 44.69207382202148 0.006999235600233078 44.68616104125977 0.007077784743160009 44.68157958984375 C 0.007111920509487391 44.67959213256836 0.007134199142456055 44.67828750610352 0.007168582174926996 44.67630004882812 C 0.007273897062987089 44.67019271850586 0.00732401804998517 44.66731643676758 0.007431663572788239 44.66120910644531 C 0.007449163589626551 44.66021347045898 0.007477476261556149 44.65861892700195 0.007495037745684385 44.65762710571289 C 0.007792664226144552 44.64082717895508 0.008104252628982067 44.62363815307617 0.00841949600726366 44.60684204101562 C 0.008438105694949627 44.60585021972656 0.008446188643574715 44.60541152954102 0.008464859798550606 44.60441589355469 C 0.008579493500292301 44.59830856323242 0.008665462955832481 44.59377670288086 0.008782424964010715 44.58767318725586 C 0.008801435120403767 44.58667755126953 0.008806249126791954 44.58642959594727 0.00882532075047493 44.5854377746582 C 0.1594143807888031 36.7230110168457 2.240568161010742 29.35091972351074 5.781453609466553 22.95141983032227 C 6.867187976837158 21.0696907043457 9.264472961425781 20.3952693939209 11.17581272125244 21.44847869873047 C 13.11065196990967 22.51463890075684 13.81485271453857 24.94741821289062 12.74869251251221 26.88225746154785 C 9.642072677612305 32.52007675170898 8.000012397766113 38.95969772338867 8.000012397766113 45.50494003295898 C 8.000012397766113 66.18525695800781 24.3083324432373 83.00994110107422 44.35397338867188 83.00994110107422 C 46.56311416625977 83.00994110107422 48.35397338867188 84.80079650878906 48.35397338867188 87.00994110107422 C 48.35397338867188 89.21907806396484 46.56311416625977 91.00994110107422 44.35397338867188 91.00994110107422 Z"
              stroke="none"
              fill="#02bc77"
            />
          </g>
        </g>
        <path
          id="Polygon_2"
          data-name="Polygon 2"
          d="M3.551,0,7.1,42.618H0Z"
          fill="#02bc77"
          style={{
            transform: `translate(${x}px, ${y}px) rotate(${
              // -90 + score * 16.363636
              r
            }deg)`,
          }}
        />
        <text
          id="_0"
          data-name="0"
          transform="translate(161 589)"
          fill="#9a9a9a"
          font-size="9"
          font-family="Roboto-Medium, Roboto"
          font-weight="500"
        >
          <tspan x="0" y="0">
            0
          </tspan>
        </text>
        <text
          id="_3"
          data-name="3"
          transform="translate(174 545)"
          fill="#9a9a9a"
          font-size="9"
          font-family="Roboto-Medium, Roboto"
          font-weight="500"
        >
          <tspan x="0" y="0">
            3
          </tspan>
        </text>
        <text
          id="_5"
          data-name="5"
          transform="translate(212 526)"
          fill="#9a9a9a"
          font-size="9"
          font-family="Roboto-Medium, Roboto"
          font-weight="500"
        >
          <tspan x="0" y="0">
            5
          </tspan>
        </text>
        <text
          id="_7"
          data-name="7"
          transform="translate(254 545)"
          fill="#9a9a9a"
          font-size="9"
          font-family="Roboto-Medium, Roboto"
          font-weight="500"
        >
          <tspan x="0" y="0">
            7
          </tspan>
        </text>
        <text
          id="_10"
          data-name="10"
          transform="translate(263 589)"
          fill="#9a9a9a"
          font-size="9"
          font-family="Roboto-Medium, Roboto"
          font-weight="500"
        >
          <tspan x="0" y="0">
            10
          </tspan>
        </text>
        <rect
          id="Rectangle_2739"
          data-name="Rectangle 2739"
          width="8.287"
          height="2.368"
          transform="matrix(0.996, 0.087, -0.087, 0.996, 158.244, 569.916)"
          fill="#e5e4e4"
        />
        <rect
          id="Rectangle_2740"
          data-name="Rectangle 2740"
          width="8.287"
          height="2.368"
          transform="translate(162.314 551.313) rotate(16)"
          fill="#e5e4e4"
        />
        <rect
          id="Rectangle_2741"
          data-name="Rectangle 2741"
          width="8.287"
          height="2.368"
          transform="translate(183.534 525.606) rotate(47)"
          fill="#e5e4e4"
        />
        <rect
          id="Rectangle_2742"
          data-name="Rectangle 2742"
          width="8.287"
          height="2.368"
          transform="translate(195.47 519.56) rotate(65)"
          fill="#e5e4e4"
        />
        <rect
          id="Rectangle_2743"
          data-name="Rectangle 2743"
          width="8.287"
          height="2.368"
          transform="translate(249.476 526.406) rotate(133)"
          fill="#e5e4e4"
        />
        <rect
          id="Rectangle_2744"
          data-name="Rectangle 2744"
          width="8.287"
          height="2.368"
          transform="translate(237.954 519.745) rotate(115)"
          fill="#e5e4e4"
        />
        <rect
          id="Rectangle_2745"
          data-name="Rectangle 2745"
          width="8.286"
          height="2.368"
          transform="matrix(-0.996, 0.087, -0.087, -0.996, 274.543, 572.601)"
          fill="#e5e4e4"
        />
        <rect
          id="Rectangle_2746"
          data-name="Rectangle 2746"
          width="8.286"
          height="2.368"
          transform="translate(270.92 553.914) rotate(164)"
          fill="#e5e4e4"
        />
        <g
          transform="matrix(1, 0, 0, 1, 158.04, 517)"
          filter="url(#Ellipse_1221)"
        >
          <g
            id="Ellipse_1221-2"
            data-name="Ellipse 1221"
            transform="translate(51.96 64)"
            fill="#fff"
            stroke="#02bc77"
            stroke-width="1"
          >
            <ellipse cx="6" cy="5.5" rx="6" ry="5.5" stroke="none" />
            <ellipse cx="6" cy="5.5" rx="5.5" ry="5" fill="none" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default ScoreMeter;
