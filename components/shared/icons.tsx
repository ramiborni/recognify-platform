import React from "react";
import Image, { ImageProps } from "next/image";
import AsanaLogo from "@/public/_static/logos/Asana.png";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Award,
  Badge,
  BadgeCheck,
  BicepsFlexed,
  Blocks,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUp,
  ChevronUp,
  ClipboardCheck,
  Copy,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Home,
  Laptop,
  LayoutPanelLeft,
  LineChart,
  LinkedinIcon,
  Loader2,
  LucideIcon,
  LucideProps,
  MapPinIcon,
  MessagesSquare,
  Moon,
  MoreVertical,
  Package,
  Plus,
  Puzzle,
  Rocket,
  Search,
  Settings,
  Slack,
  SunMedium,
  Trash,
  User,
  Users,
  X,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  clap: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      viewBox="0 0 297.221 297.221"
    >
      <g>
        <path
          d="M283.762,32.835c2.705-1.913,3.346-5.658,1.432-8.363c-1.914-2.705-5.657-3.347-8.363-1.432l-14.984,10.602
		c-2.705,1.913-3.346,5.658-1.432,8.363c1.169,1.652,3.022,2.535,4.902,2.535c1.198,0,2.408-0.358,3.461-1.104L283.762,32.835z"
        />
        <path
          d="M244.064,29.387c0.695,0.262,1.409,0.386,2.11,0.386c2.428,0,4.713-1.484,5.617-3.891l6.46-17.182
		c1.166-3.101-0.403-6.561-3.505-7.727c-3.101-1.167-6.562,0.404-7.728,3.505l-6.46,17.182
		C239.393,24.761,240.962,28.221,244.064,29.387z"
        />
        <path
          d="M291.223,55.611c-0.041,0-0.082,0-0.124,0l-18.351,0.154c-3.313,0.067-5.944,2.605-5.877,5.918
		c0.066,3.271,2.739,5.928,5.997,5.928c0.041,0,0.082,0,0.124,0l18.351-0.313c3.313-0.068,5.944-2.732,5.877-6.045
		C297.154,57.982,294.481,55.611,291.223,55.611z"
        />
        <path
          d="M254.2,147.154c-3.073-2.433-6.711-4.089-10.557-4.867c0.254-0.46,0.491-0.928,0.715-1.403l2.408-2.408
		c9.274-9.275,10.248-23.874,2.264-33.961c-3.769-4.761-9.001-7.925-14.812-9.106c0.415-0.764,0.783-1.545,1.117-2.338
		c6.316-9.149,6.213-21.445-0.782-30.283c-3.77-4.764-9.004-7.938-14.818-9.117c4.8-8.826,4.187-19.826-2.225-27.925
		c-4.848-6.125-12.109-9.639-19.923-9.639c-6.257,0-12.16,2.236-16.792,6.33c-0.701-3.979-2.363-7.822-5.012-11.169
		c-4.849-6.125-12.11-9.638-19.924-9.639l0,0c-6.79,0-13.164,2.635-17.947,7.418l-60.84,60.84l-0.232-8.12
		c-0.107-13.83-11.392-25.049-25.247-25.049c-13.604,0-24.729,10.815-25.229,24.298l-12.146,88.306l-9.983,11.604
		c-5.983,6.957-5.582,17.481,0.915,23.962L19.987,199.7c-4.574,6.881-3.773,16.266,2.206,22.23l69.667,69.557
		c3.329,3.321,7.748,5.148,12.446,5.148c3.857,0,7.668-1.295,10.729-3.645l14.544-11.168c13.991-3.305,29.416-10.813,45.874-22.33
		c14.371-10.058,29.962-23.46,46.337-39.836l34.631-34.631c5.107-5.107,7.795-12.188,7.375-19.427
		C263.376,158.371,259.879,151.649,254.2,147.154z M188.124,32.009c2.603-2.602,6.032-3.903,9.462-3.903
		c3.915,0,7.831,1.695,10.515,5.086c4.256,5.377,3.51,13.18-1.339,18.028l-6.177,6.176c-0.952,0.635-1.879,1.314-2.747,2.083
		c-0.701-3.98-2.364-7.823-5.013-11.169c-3.257-4.114-7.604-7.043-12.475-8.527L188.124,32.009z M146.397,17.532
		c2.602-2.602,6.032-3.903,9.462-3.903c3.916,0.001,7.831,1.696,10.515,5.087c4.256,5.377,3.51,13.179-1.339,18.027l-70.919,70.186
		l-0.233-8.119c-0.061-7.825-3.7-14.812-9.356-19.405L146.397,17.532z M13.624,176.391c-2.082-2.078-2.209-5.41-0.291-7.64
		l12.281-14.277c0.006-0.007,0.011-0.017,0.012-0.026l12.72-92.483c0-7.286,5.961-13.247,13.247-13.247
		c7.286,0,13.248,5.961,13.248,13.247L65.186,74c-11.988,1.646-21.322,11.733-21.78,24.057l-12.145,88.307l-3.533,4.108
		L13.624,176.391z M247.935,176.539l-34.63,34.631c-29.577,29.577-60.494,53.318-87.653,59.237
		c-0.825,0.181-1.601,0.528-2.271,1.043l-15.655,12.022c-1.014,0.779-2.219,1.162-3.419,1.162c-1.443,0-2.88-0.555-3.968-1.641
		l-69.671-69.56c-2.083-2.077-2.21-5.409-0.291-7.64l12.28-14.276c0.007-0.008,0.011-0.017,0.013-0.026l12.719-92.483
		c0-7.286,5.962-13.248,13.248-13.248c7.286,0,13.247,5.962,13.247,13.248l0.626,21.824c0.104,3.626,3.087,5.987,6.191,5.987
		c1.514,0,3.058-0.563,4.309-1.813l70.431-70.431c2.603-2.603,6.031-3.903,9.462-3.903c3.915,0,7.831,1.695,10.515,5.086
		c4.256,5.377,3.509,13.18-1.34,18.028l-48.518,48.518c-2.519,2.52-2.519,6.603,0,9.121l0,0c1.275,1.275,2.946,1.913,4.617,1.913
		s3.343-0.638,4.617-1.913l62.374-62.373c2.602-2.603,6.031-3.903,9.462-3.903c3.915,0.001,7.831,1.696,10.515,5.087
		c4.256,5.376,3.509,13.179-1.34,18.027l-62.081,62.081c-2.553,2.554-2.553,6.692,0,9.246c1.258,1.258,2.906,1.887,4.556,1.887
		c1.648,0,3.297-0.629,4.555-1.887l48.811-48.81c2.603-2.603,6.032-3.903,9.462-3.903c3.915,0,7.831,1.695,10.515,5.087
		c4.256,5.376,3.509,13.179-1.34,18.027l-48.349,48.35c-2.612,2.611-2.612,6.847,0,9.458l0.078,0.079
		c1.207,1.207,2.789,1.81,4.37,1.81c1.582,0,3.164-0.603,4.37-1.81l29.974-29.974c2.701-2.701,6.317-4.129,9.921-4.129
		c2.867,0,5.726,0.904,8.107,2.789C253.114,161.598,253.508,170.967,247.935,176.539z"
        />
      </g>
    </svg>
  ),
  map: ChevronsUp,
  blocks: Blocks,
  gif: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <title>GIF Icon</title>
      <desc>GIF icon that can be styled with text-foreground class</desc>
      <g stroke="none" strokeWidth={1} fillRule="evenodd">
        <g fillRule="nonzero">
          <path d="M18.75,3.50054297 C20.5449254,3.50054297 22,4.95561754 22,6.75054297 L22,17.2531195 C22,19.048045 20.5449254,20.5031195 18.75,20.5031195 L5.25,20.5031195 C3.45507456,20.5031195 2,19.048045 2,17.2531195 L2,6.75054297 C2,4.95561754 3.45507456,3.50054297 5.25,3.50054297 L18.75,3.50054297 Z M8.01459972,8.87193666 C6.38839145,8.87193666 5.26103525,10.2816525 5.26103525,11.9943017 C5.26103525,13.707564 6.38857781,15.1202789 8.01459972,15.1202789 C8.90237918,15.1202789 9.71768065,14.6931811 10.1262731,13.9063503 L10.2024697,13.7442077 L10.226,13.674543 L10.2440163,13.5999276 L10.2440163,13.5999276 L10.2516169,13.5169334 L10.2518215,11.9961937 L10.2450448,11.9038358 C10.2053646,11.6359388 9.99569349,11.4234501 9.72919932,11.3795378 L9.62682145,11.3711937 L8.62521827,11.3711937 L8.53286035,11.3779703 C8.26496328,11.4176506 8.05247466,11.6273217 8.00856234,11.8938159 L8.00021827,11.9961937 L8.00699487,12.0885517 C8.0466751,12.3564487 8.25634623,12.5689373 8.5228404,12.6128497 L8.62521827,12.6211937 L9.00103525,12.6209367 L9.00103525,13.3549367 L8.99484486,13.3695045 C8.80607251,13.6904125 8.44322427,13.8702789 8.01459972,13.8702789 C7.14873038,13.8702789 6.51103525,13.0713011 6.51103525,11.9943017 C6.51103525,10.9182985 7.14788947,10.1219367 8.01459972,10.1219367 C8.43601415,10.1219367 8.67582824,10.1681491 8.97565738,10.3121334 C9.28681641,10.4615586 9.6601937,10.3304474 9.80961888,10.0192884 C9.95904407,9.70812933 9.82793289,9.33475204 9.51677386,9.18532686 C9.03352891,8.95326234 8.61149825,8.87193666 8.01459972,8.87193666 Z M12.6289445,8.99393497 C12.3151463,8.99393497 12.0553614,9.22519285 12.0107211,9.52657705 L12.0039445,9.61893497 L12.0039445,14.381065 L12.0107211,14.4734229 C12.0553614,14.7748072 12.3151463,15.006065 12.6289445,15.006065 C12.9427427,15.006065 13.2025276,14.7748072 13.2471679,14.4734229 L13.2539445,14.381065 L13.2539445,9.61893497 L13.2471679,9.52657705 C13.2025276,9.22519285 12.9427427,8.99393497 12.6289445,8.99393497 Z M17.6221579,9.00083497 L15.6247564,8.99393111 C15.3109601,8.99285493 15.0503782,9.22321481 15.0046948,9.52444312 L14.9975984,9.61677709 L14.9975984,14.3649711 L15.0043751,14.4573291 C15.0440553,14.7252261 15.2537265,14.9377148 15.5202206,14.9816271 L15.6225985,14.9899711 L15.7149564,14.9831945 C15.9828535,14.9435143 16.1953421,14.7338432 16.2392544,14.467349 L16.2475985,14.3649711 L16.2470353,13.2499367 L17.37,13.2504012 L17.4623579,13.2436246 C17.730255,13.2039444 17.9427436,12.9942732 17.9866559,12.7277791 L17.995,12.6254012 L17.9882234,12.5330433 C17.9485432,12.2651462 17.738872,12.0526576 17.4723779,12.0087453 L17.37,12.0004012 L16.2470353,11.9999367 L16.2470353,10.2449367 L17.6178421,10.2508313 L17.7102229,10.2443727 C18.0117595,10.2007704 18.2439132,9.94178541 18.2450039,9.62798912 C18.24608,9.31419284 18.0157202,9.05361096 17.7144919,9.00793041 L17.6221579,9.00083497 L15.6247564,8.99393111 L17.6221579,9.00083497 Z" />
        </g>
      </g>
    </svg>
  ),
  team: Users,
  clipboard: ClipboardCheck,
  users: Users,
  award: Award,
  slack: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      enable-background="new 0 0 2447.6 2452.5"
      viewBox="0 0 2447.6 2452.5"
    >
      <g clip-rule="evenodd" fill-rule="evenodd">
        <path
          d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
          fill="#36c5f0"
        />
        <path
          d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
          fill="#2eb67d"
        />
        <path
          d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
          fill="#ecb22e"
        />
        <path
          d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
          fill="#e01e5a"
        />
      </g>
    </svg>
  ),
  microsoftTeams: ({ ...props }: LucideProps) => (
    <svg {...props} viewBox="0 0 2228.833 2073.333">
      <path
        fill="#5059C9"
        d="M1554.637,777.5h575.713c54.391,0,98.483,44.092,98.483,98.483c0,0,0,0,0,0v524.398 c0,199.901-162.051,361.952-361.952,361.952h0h-1.711c-199.901,0.028-361.975-162-362.004-361.901c0-0.017,0-0.034,0-0.052V828.971 C1503.167,800.544,1526.211,777.5,1554.637,777.5L1554.637,777.5z"
      />
      <circle fill="#5059C9" cx="1943.75" cy="440.583" r="233.25" />
      <circle fill="#7B83EB" cx="1218.083" cy="336.917" r="336.917" />
      <path
        fill="#7B83EB"
        d="M1667.323,777.5H717.01c-53.743,1.33-96.257,45.931-95.01,99.676v598.105 c-7.505,322.519,247.657,590.16,570.167,598.053c322.51-7.893,577.671-275.534,570.167-598.053V877.176 C1763.579,823.431,1721.066,778.83,1667.323,777.5z"
      />
      <path
        opacity=".1"
        d="M1244,777.5v838.145c-0.258,38.435-23.549,72.964-59.09,87.598 c-11.316,4.787-23.478,7.254-35.765,7.257H667.613c-6.738-17.105-12.958-34.21-18.142-51.833 c-18.144-59.477-27.402-121.307-27.472-183.49V877.02c-1.246-53.659,41.198-98.19,94.855-99.52H1244z"
      />
      <path
        opacity=".2"
        d="M1192.167,777.5v889.978c-0.002,12.287-2.47,24.449-7.257,35.765 c-14.634,35.541-49.163,58.833-87.598,59.09H691.975c-8.812-17.105-17.105-34.21-24.362-51.833 c-7.257-17.623-12.958-34.21-18.142-51.833c-18.144-59.476-27.402-121.307-27.472-183.49V877.02 c-1.246-53.659,41.198-98.19,94.855-99.52H1192.167z"
      />
      <path
        opacity=".2"
        d="M1192.167,777.5v786.312c-0.395,52.223-42.632,94.46-94.855,94.855h-447.84 c-18.144-59.476-27.402-121.307-27.472-183.49V877.02c-1.246-53.659,41.198-98.19,94.855-99.52H1192.167z"
      />
      <path
        opacity=".2"
        d="M1140.333,777.5v786.312c-0.395,52.223-42.632,94.46-94.855,94.855H649.472 c-18.144-59.476-27.402-121.307-27.472-183.49V877.02c-1.246-53.659,41.198-98.19,94.855-99.52H1140.333z"
      />
      <path
        opacity=".1"
        d="M1244,509.522v163.275c-8.812,0.518-17.105,1.037-25.917,1.037 c-8.812,0-17.105-0.518-25.917-1.037c-17.496-1.161-34.848-3.937-51.833-8.293c-104.963-24.857-191.679-98.469-233.25-198.003 c-7.153-16.715-12.706-34.071-16.587-51.833h258.648C1201.449,414.866,1243.801,457.217,1244,509.522z"
      />
      <path
        opacity=".2"
        d="M1192.167,561.355v111.442c-17.496-1.161-34.848-3.937-51.833-8.293 c-104.963-24.857-191.679-98.469-233.25-198.003h190.228C1149.616,466.699,1191.968,509.051,1192.167,561.355z"
      />
      <path
        opacity=".2"
        d="M1192.167,561.355v111.442c-17.496-1.161-34.848-3.937-51.833-8.293 c-104.963-24.857-191.679-98.469-233.25-198.003h190.228C1149.616,466.699,1191.968,509.051,1192.167,561.355z"
      />
      <path
        opacity=".2"
        d="M1140.333,561.355v103.148c-104.963-24.857-191.679-98.469-233.25-198.003 h138.395C1097.783,466.699,1140.134,509.051,1140.333,561.355z"
      />
      <linearGradient
        id="a"
        gradientUnits="userSpaceOnUse"
        x1="198.099"
        y1="1683.0726"
        x2="942.2344"
        y2="394.2607"
        gradientTransform="matrix(1 0 0 -1 0 2075.3333)"
      >
        <stop offset="0" stopColor="#5a62c3" />
        <stop offset=".5" stopColor="#4d55bd" />
        <stop offset="1" stopColor="#3940ab" />
      </linearGradient>
      <path
        fill="url(#a)"
        d="M95.01,466.5h950.312c52.473,0,95.01,42.538,95.01,95.01v950.312c0,52.473-42.538,95.01-95.01,95.01 H95.01c-52.473,0-95.01-42.538-95.01-95.01V561.51C0,509.038,42.538,466.5,95.01,466.5z"
      />
      <path
        fill="#FFF"
        d="M820.211,828.193H630.241v517.297H509.211V828.193H320.123V727.844h500.088V828.193z"
      />
    </svg>
  ),
  googleWorkspace: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      width="2443"
      height="2500"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 262"
      id="google"
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      ></path>
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      ></path>
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      ></path>
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      ></path>
    </svg>
  ),
  jira: ({ ...props }: LucideProps) => (
    <svg {...props} viewBox="0 0 128 128">
      <defs>
        <linearGradient
          id="jira-original-a"
          gradientUnits="userSpaceOnUse"
          x1="22.034"
          y1="9.773"
          x2="17.118"
          y2="14.842"
          gradientTransform="scale(4)"
        >
          <stop offset=".176" stopColor="#0052cc" />
          <stop offset="1" stopColor="#2684ff" />
        </linearGradient>
        <linearGradient
          id="jira-original-b"
          gradientUnits="userSpaceOnUse"
          x1="16.641"
          y1="15.564"
          x2="10.957"
          y2="21.094"
          gradientTransform="scale(4)"
        >
          <stop offset=".176" stopColor="#0052cc" />
          <stop offset="1" stopColor="#2684ff" />
        </linearGradient>
      </defs>
      <path
        d="M108.023 16H61.805c0 11.52 9.324 20.848 20.847 20.848h8.5v8.226c0 11.52 9.328 20.848 20.848 20.848V19.977A3.98 3.98 0 00108.023 16zm0 0"
        fill="#2684ff"
      />
      <path
        d="M85.121 39.04H38.902c0 11.519 9.325 20.847 20.844 20.847h8.504v8.226c0 11.52 9.328 20.848 20.848 20.848V43.016a3.983 3.983 0 00-3.977-3.977zm0 0"
        fill="url(#jira-original-a)"
      />
      <path
        d="M62.219 62.078H16c0 11.524 9.324 20.848 20.848 20.848h8.5v8.23c0 11.52 9.328 20.844 20.847 20.844V66.059a3.984 3.984 0 00-3.976-3.98zm0 0"
        fill="url(#jira-original-b)"
      />
    </svg>
  ),
  trello: ({ ...props }: LucideProps) => (
    <svg {...props} width="64" viewBox="0 0 73.323 64" height="64">
      <defs>
        <linearGradient
          id="A"
          x1="31.52"
          y1="64.56"
          x2="31.52"
          y2="1.51"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".18" stopColor="#0052cc" />
          <stop offset="1" stopColor="#2684ff" />
        </linearGradient>
      </defs>
      <path
        d="M55.16 1.5H7.88a7.88 7.88 0 0 0-5.572 2.308A7.88 7.88 0 0 0 0 9.39v47.28a7.88 7.88 0 0 0 7.88 7.88h47.28A7.88 7.88 0 0 0 63 56.67V9.4a7.88 7.88 0 0 0-7.84-7.88zM27.42 49.26A3.78 3.78 0 0 1 23.64 53H12a3.78 3.78 0 0 1-3.8-3.74V13.5A3.78 3.78 0 0 1 12 9.71h11.64a3.78 3.78 0 0 1 3.78 3.78zM54.85 33.5a3.78 3.78 0 0 1-3.78 3.78H39.4a3.78 3.78 0 0 1-3.78-3.78v-20a3.78 3.78 0 0 1 3.78-3.79h11.67a3.78 3.78 0 0 1 3.78 3.78z"
        fill="url(#A)"
        fill-rule="evenodd"
        transform="matrix(1.163111 0 0 1.163111 .023263 -6.417545)"
      />
    </svg>
  ),
  asana: ({ ...props }: any) => (
    <Image {...props} src={AsanaLogo as unknown as string} alt="Asana" />
  ),
  recognition: ClipboardCheck,
  rocket: Rocket,
  arms: BicepsFlexed,
  boost: ChevronsUp,
  add: Plus,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  billing: CreditCard,
  bookOpen: BookOpen,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  check: Check,
  close: X,
  copy: Copy,
  dashboard: LayoutPanelLeft,
  ellipsis: MoreVertical,
  linkedin: LinkedinIcon,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        fill="currentColor"
      />
    </svg>
  ),
  nextjs: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="nextjs"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="currentColor"
        d="m4.5 4.5l.405-.293A.5.5 0 0 0 4 4.5zm3 9.5A6.5 6.5 0 0 1 1 7.5H0A7.5 7.5 0 0 0 7.5 15zM14 7.5A6.5 6.5 0 0 1 7.5 14v1A7.5 7.5 0 0 0 15 7.5zM7.5 1A6.5 6.5 0 0 1 14 7.5h1A7.5 7.5 0 0 0 7.5 0zm0-1A7.5 7.5 0 0 0 0 7.5h1A6.5 6.5 0 0 1 7.5 1zM5 12V4.5H4V12zm-.905-7.207l6.5 9l.81-.586l-6.5-9zM10 4v6h1V4z"
      ></path>
    </svg>
  ),
  help: HelpCircle,
  home: Home,
  laptop: Laptop,
  lineChart: LineChart,
  logo: ({ ...props }: LucideProps) => <></>,
  media: Image,
  messages: MessagesSquare,
  moon: Moon,
  package: Package,
  page: File,
  post: FileText,
  search: Search,
  settings: Settings,
  spinner: Loader2,
  sun: SunMedium,
  trash: Trash,
  twitter: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="twitter"
      role="img"
      {...props}
    >
      <path
        d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"
        fill="currentColor"
      />
    </svg>
  ),
  user: User,
  warning: AlertTriangle,
};
